// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.7;

library DeFundModel {
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

    enum RecurringPaymentStatus {
        ACTIVE,
        CANCELLED
    }

    struct RecurringPaymentDisposition {
        address owner;
        address target;
        address tokenAddress;
        uint amount;
        uint32 intervalHours;
        uint lastExecution;
        RecurringPaymentStatus status;
    }
}
