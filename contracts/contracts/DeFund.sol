// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "hardhat/console.sol";

contract DeFund is /*ChainlinkClient, KeeperCompatibleInterface,*/ Ownable {
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

    // TODO fundraiser goal is always in USD, it auto-closes once the threshold is reached (use keepers and price feeds)

    /* Deposit funds to the contract */
    function depositFunds(uint _amount, address _tokenAddress) external payable {
        require(_amount > 0, "Cannot deposit 0");
        if (_tokenAddress == address(0)) {
            // ETH deposit
            require(msg.value == _amount);
            s_userBalances[msg.sender][address(0)] = s_userBalances[msg.sender][address(0)] + _amount;
        } else {
            // ERC20 deposit
            require(isTokenAllowed(_tokenAddress), "Sorry, we don't support this token yet");
            // TODO hmm doesn't seem to work
            IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);
            s_userBalances[msg.sender][_tokenAddress] = s_userBalances[msg.sender][_tokenAddress] + _amount;
        }
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
}
