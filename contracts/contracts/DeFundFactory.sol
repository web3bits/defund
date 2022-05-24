// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./DeFundModel.sol";
import "./DeFund.sol";

error DeFundFactory__deposit__zero_deposit();
error DeFundFactory__deposit__less_than_declared();
error DeFundFactory__deposit__token_not_allowed();
error DeFundFactory__not_implemented();

contract DeFundFactory is KeeperCompatibleInterface, Ownable {
    /* State variables */
    uint private s_counterFundraisers = 0;
    uint private s_counterRecurringPayments = 0;
    uint public s_lastTimeStamp;
    address[] public s_allowedERC20Tokens;
    mapping(address => mapping(address => uint)) public s_userBalances;
    mapping(uint => address) public s_fundraisers;
    mapping(address => uint[]) public s_fundraisersByOwner;
    mapping(uint => DeFundModel.RecurringPaymentDisposition) public s_recurringPayments;
    mapping(address => uint[]) public s_recurringPaymentsByOwner;
    AggregatorV3Interface public s_priceFeed;
    uint i_recurringInterval = 1 hours;

    /* Events */
    event FundraiserCreated(uint indexed fundraiserId, address indexed creator, string title, DeFundModel.FundraiserType fundraiserType, DeFundModel.FundraiserCategory category, uint endDate, uint goalAmount);
    event UserBalanceChanged(address indexed creator, address tokenAddress, uint previousBalance, uint newBalance);


    /* Constructor - provide ETH/USD Chainlink price feed address */
    /* Kovan: 0x9326BFA02ADD2366b30bacB125260Af641031331 */
    constructor(/*address _ethUsdPriceFeed*/) {
        // s_priceFeed = AggregatorV3Interface(_ethUsdPriceFeed);
        s_priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
        s_lastTimeStamp = block.timestamp;
    }

    /* Deposit funds to the contract */
    function depositFunds(uint _amount, address _tokenAddress) external payable {
        if (_amount == 0) {
            revert DeFundFactory__deposit__zero_deposit();
        }
        uint currentBalance = s_userBalances[msg.sender][_tokenAddress];
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

            /// TODO
            revert DeFundFactory__not_implemented();
        }
        emit UserBalanceChanged(msg.sender, _tokenAddress, currentBalance, s_userBalances[msg.sender][_tokenAddress]);
    }

    /* Withdraw funds from the contract */
    function withdrawFunds(uint _amount, address _tokenAddress) public {
        require(_amount > 0, "Cannot withdraw 0");
        uint currentBalance = s_userBalances[msg.sender][_tokenAddress];
        require(_amount <= currentBalance, "Not enough balance");

        s_userBalances[msg.sender][_tokenAddress] = currentBalance - _amount;

        if (_tokenAddress == address(0)) {
            (bool success, ) = msg.sender.call{value: _amount}("");
            require(success, "Transfer failed.");
        } else {
            // TODO
            revert DeFundFactory__not_implemented();
        }
        emit UserBalanceChanged(msg.sender, _tokenAddress, s_userBalances[msg.sender][_tokenAddress], currentBalance - _amount);
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

    /* Create a new fundraiser */
    function createFundraiser(
        DeFundModel.FundraiserType _type,
        DeFundModel.FundraiserCategory _category,
        string calldata _name,
        string calldata _description,
        uint _endDate,
        uint _goalAmount
    ) external returns (uint fundraiserId) {
        fundraiserId = s_counterFundraisers;
        s_counterFundraisers = s_counterFundraisers + 1;

        DeFund fundraiser = new DeFund(
            fundraiserId,
            msg.sender,
            _type,
            _category,
            _name,
            _description,
            _endDate,
            _goalAmount
        );

        s_fundraisers[fundraiserId] = address(fundraiser);
        s_fundraisersByOwner[msg.sender].push(fundraiserId);

        emit FundraiserCreated(fundraiserId, msg.sender, _name, _type, _category, _endDate, _goalAmount);

        return fundraiserId;
    }

    /* Donate to a fundraiser (lookup by ID) */
    function donateById(
        uint _fundraiserId,
        uint _amount,
        address _tokenAddress
    ) public {
        donateByAddress(s_fundraisers[_fundraiserId], _amount, _tokenAddress);
    }

    /* Donate to a fundraiser (lookup by address) */
    function donateByAddress(
        address _fundraiserAddress,
        uint _amount,
        address _tokenAddress
    ) public {
        require(_amount > 0, "Cannot donate 0");
        uint currentBalance = s_userBalances[msg.sender][_tokenAddress];
        require(_amount <= currentBalance, "Not enough balance");

        s_userBalances[msg.sender][_tokenAddress] = currentBalance - _amount;

        if (_tokenAddress == address(0)) {
            bool success = DeFund(_fundraiserAddress).makeDonation{value: _amount}(msg.sender, _amount, _tokenAddress);
            require(success, "Transfer failed.");
        } else {
            // TODO
            revert DeFundFactory__not_implemented();
        }
    }

    /* Get user balance */
    function getMyBalance(address _token) public view returns (uint balance) {
        return s_userBalances[msg.sender][_token];
    }

    /* Create a recurring payment */
    function createRecurringPayment(
        address _targetFundraiser,
        address _tokenAddress,
        uint _amount,
        uint32 _intervalHours
    ) external returns (uint recurringPaymentId) {
        recurringPaymentId = s_counterRecurringPayments;
        s_counterRecurringPayments = s_counterRecurringPayments + 1;
        s_recurringPayments[recurringPaymentId].owner = msg.sender;
        s_recurringPayments[recurringPaymentId].target = _targetFundraiser;
        s_recurringPayments[recurringPaymentId].tokenAddress = _tokenAddress;
        s_recurringPayments[recurringPaymentId].amount = _amount;
        s_recurringPayments[recurringPaymentId].intervalHours = _intervalHours;
        s_recurringPayments[recurringPaymentId].status = DeFundModel.RecurringPaymentStatus.ACTIVE;

        s_recurringPaymentsByOwner[msg.sender].push(recurringPaymentId);

        executeRecurringPayment(recurringPaymentId);

        return recurringPaymentId;
    }

    /* Execute recurring payment - called internally on upkeep */
    function executeRecurringPayment(uint _id) internal {
        uint executorBalance = s_userBalances[s_recurringPayments[_id].owner][s_recurringPayments[_id].tokenAddress];
        if (executorBalance >= s_recurringPayments[_id].amount) {
            s_userBalances[s_recurringPayments[_id].owner][s_recurringPayments[_id].tokenAddress] = executorBalance - s_recurringPayments[_id].amount;

            DeFund fundraiser = DeFund(s_recurringPayments[_id].target);
            if (fundraiser.s_status() == DeFundModel.FundraiserStatus.ACTIVE && fundraiser.i_type() == DeFundModel.FundraiserType.RECURRING_DONATION) {
                fundraiser.makeDonation{value: s_recurringPayments[_id].amount}(s_recurringPayments[_id].owner, s_recurringPayments[_id].amount, s_recurringPayments[_id].tokenAddress);
            }
        }
        s_recurringPayments[_id].lastExecution = block.timestamp;
    }

    /* Keepers integration */
    function checkUpkeep(bytes memory /* checkData */) public override view returns (
        bool upkeepNeeded,
        bytes memory /* performData */
    ) {
        bool intervalPassed = (block.timestamp - s_lastTimeStamp) > i_recurringInterval;
        bool hasFundraisersAndPayments = s_counterFundraisers > 0 && s_counterRecurringPayments > 0;

        // TODO optimize - return IDs of payments in performData
//        bool hasPaymentsToExecute = RecurringPayments.hasPaymentsToExecute(s_counterRecurringPayments, s_recurringPayments, s_userBalances);
        bool hasPaymentsToExecute = false;
        for (uint id = 0; id < s_counterRecurringPayments; id++) {
            if (s_recurringPayments[id].status != DeFundModel.RecurringPaymentStatus.ACTIVE) {
                continue;
            }

            if (DeFund(s_recurringPayments[id].target).i_type() != DeFundModel.FundraiserType.RECURRING_DONATION) {
                continue;
            }

            if (DeFund(s_recurringPayments[id].target).s_status() != DeFundModel.FundraiserStatus.ACTIVE) {
                continue;
            }

            if (s_userBalances[s_recurringPayments[id].owner][s_recurringPayments[id].tokenAddress] < s_recurringPayments[id].amount) {
                continue;
            }


            if (block.timestamp > s_recurringPayments[id].lastExecution + (s_recurringPayments[id].intervalHours * 60 * 60)) {
                hasPaymentsToExecute = true;
                break;
            }
        }

        upkeepNeeded = intervalPassed && hasFundraisersAndPayments && hasPaymentsToExecute;

        return (upkeepNeeded, "");
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        for (uint id = 0; id < s_counterRecurringPayments; id++) {
            if (s_recurringPayments[id].status != DeFundModel.RecurringPaymentStatus.ACTIVE) {
                continue;
            }

            if (DeFund(s_recurringPayments[id].target).i_type() != DeFundModel.FundraiserType.RECURRING_DONATION) {
                continue;
            }

            if (DeFund(s_recurringPayments[id].target).s_status() != DeFundModel.FundraiserStatus.ACTIVE) {
                continue;
            }

            if (s_userBalances[s_recurringPayments[id].owner][s_recurringPayments[id].tokenAddress] < s_recurringPayments[id].amount) {
                continue;
            }


            if (block.timestamp > s_recurringPayments[id].lastExecution + (s_recurringPayments[id].intervalHours * 60 * 60)) {
                executeRecurringPayment(id);
            }
        }
    }
}
