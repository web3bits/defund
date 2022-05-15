// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "hardhat/console.sol";
import "./DeFund.sol";

    error DeFundFactory__deposit__zero_deposit();
    error DeFundFactory__deposit__less_than_declared();
    error DeFundFactory__deposit__token_not_allowed();

contract DeFundFactory is /*ChainlinkClient, KeeperCompatibleInterface,*/ Ownable {
    /* Types */
    enum FundraiserType {
        ONE_TIME_DONATION,
        RECURRING_DONATION,
        LOAN
    }

    enum FundraiserStatus {
        ACTIVE,
        FULLY_FUNDED,
        REPAYING,
        REPAID,
        CLOSED
    }

    enum FundraiserCategory {
        MEDICAL,
        EMERGENCY,
        FINANCIAL_EMERGENCY,
        COMMUNITY,
        ANIMALS,
        EDUCATION
    }

    /* State variables */
    address[] public s_allowedERC20Tokens;
    mapping(address => mapping(address => uint)) public s_userBalances;
    uint private s_counter = 0;
    mapping(uint => address) public s_fundraisers;
    mapping(address => uint[]) public s_fundraisersByOwner;

    // TODO fundraiser goal is always in USD, it auto-closes once the threshold is reached (use keepers and price feeds)

    /* Deposit funds to the contract */
    function depositFunds(uint _amount, address _tokenAddress) external payable {
        if (_amount == 0) {
            revert DeFundFactory__deposit__zero_deposit();
        }
        if (_tokenAddress == address(0)) {
            // ETH deposit
            if (msg.value < _amount) {
                revert DeFundFactory__deposit__less_than_declared();
            }

            s_userBalances[msg.sender][address(0)] = s_userBalances[msg.sender][address(0)] + _amount;
        } else {
            // ERC20 deposit
            if (!isTokenAllowed(_tokenAddress)) {
                revert DeFundFactory__deposit__token_not_allowed();
            }

            // TODO test with approve beforehand...
            IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);
            s_userBalances[msg.sender][_tokenAddress] = s_userBalances[msg.sender][_tokenAddress] + _amount;
        }

        // TODO emit
    }

    /* Withdraw funds from the contract */
    function withdrawFunds(uint _amount, address _tokenAddress) public {
        require(_amount > 0, "Cannot withdraw 0");
        uint currentBalance = s_userBalances[msg.sender][_tokenAddress];
        require(_amount <= currentBalance, "Sorry, can't withdraw more than you have in your account :)");

        s_userBalances[msg.sender][_tokenAddress] = currentBalance - _amount;

        if (_tokenAddress == address(0)) {
            payable(msg.sender).transfer(_amount);
        } else {
            // TODO
            IERC20(_tokenAddress).transfer(msg.sender, _amount);
        }

        // TODO emit
    }

    /* Add a new token to the list allowed for deposits and withdrawals */
    function allowToken(address _tokenAddress) public onlyOwner {
        s_allowedERC20Tokens.push(_tokenAddress);
    }

    /* Check if deposited token is supported */
    function isTokenAllowed(address _tokenAddress) public view returns (bool) {
        for (
            uint256 idx = 0;
            idx < s_allowedERC20Tokens.length;
            idx++
        ) {
            if (s_allowedERC20Tokens[idx] == _tokenAddress) {
                return true;
            }
        }
        return false;
    }

    function createFundraiser(
        FundraiserType _type,
        FundraiserCategory _category,
        string calldata _name,
        string calldata _description,
        uint _endDate
    ) external returns (uint fundraiserId) {
        fundraiserId = s_counter;
        s_counter = s_counter + 1;

        DeFund fundraiser = new DeFund(
            fundraiserId,
            msg.sender,
            _type,
            _category,
            _endDate,
            _name,
            _description
        );

        s_fundraisers[fundraiserId] = address(fundraiser);
        s_fundraisersByOwner[msg.sender].push(fundraiserId);

        // TODO emit

        return fundraiserId;
    }

}
