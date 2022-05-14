// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "./DeFundFactory.sol";

contract DeFund {
    /* Immutable state variables */
    uint public immutable i_id;
    address public immutable i_owner;
    DeFundFactory.FundraiserType public immutable i_type;
    DeFundFactory.FundraiserCategory public immutable i_category;
    uint public immutable i_endDate;
    DeFundFactory private immutable i_factory;

    /* State variables */
    string[] public s_descriptions;
    string public s_name;
    DeFundFactory.FundraiserStatus public s_status;
    mapping(address => uint) public s_balances;
    mapping(address => mapping(address => uint)) public s_donors;

    /* Create a new instance of a fundraiser */
    constructor(
        uint _id,
        address _owner,
        DeFundFactory.FundraiserType _type,
        DeFundFactory.FundraiserCategory _category,
        uint _endDate,
        string memory _name,
        string memory _initialDescription
    ) {
        i_id = _id;
        i_owner = _owner;
        i_type = _type;
        i_category = _category;
        i_endDate = _endDate;
        s_name = _name;
        s_descriptions.push(_initialDescription);
        i_factory = DeFundFactory(msg.sender);
        s_status = DeFundFactory.FundraiserStatus.ACTIVE;
    }

    /* Donate funds to the fundraiser */
    function makeDonation(uint _amount, address _tokenAddress) external payable {
        // TODO check status - should not accept donations if status != active
        require(_amount > 0, "Cannot deposit 0");
        if (_tokenAddress == address(0)) {
            // ETH deposit
            require(msg.value == _amount);
            s_donors[msg.sender][address(0)] = s_donors[msg.sender][address(0)] + _amount;
            s_balances[address(0)] = s_balances[address(0)] + _amount;
        } else {
            // ERC20 deposit
            IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount);
            s_donors[msg.sender][_tokenAddress] = s_donors[msg.sender][_tokenAddress] + _amount;
            s_balances[_tokenAddress] = s_balances[_tokenAddress] + _amount;
        }

        // TODO emit
    }

    /* Withdraw funds from the contract */
    function withdrawFunds(uint _amount, address _tokenAddress) public {
        require(msg.sender == i_owner, "You must be the owner of the fundraiser to withdraw");
        require(_amount > 0, "Cannot withdraw 0");
        uint currentBalance = s_balances[_tokenAddress];
        require(_amount <= currentBalance, "Sorry, can't withdraw more than total donations");

        s_balances[_tokenAddress] = currentBalance - _amount;

        if (_tokenAddress == address(0)) {
            payable(msg.sender).transfer(_amount);
        } else {
            IERC20(_tokenAddress).transfer(msg.sender, _amount);
        }

        // TODO emit
    }

    // TODO update description
    // TODO recurring
    // TODO close one time when goal is reached (maybe control this from factory?)

}
