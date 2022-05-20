import { FundRaiserStatus } from "../enums/FundRaiserStatus";
import { FundraiserType } from "../enums/FundRaiserType";

const FUNDRAISER_TYPES: any = {};
FUNDRAISER_TYPES[FundraiserType.LOAN] = "Loan";
FUNDRAISER_TYPES[FundraiserType.ONE_TIME_DONATION] = "One time donation";
FUNDRAISER_TYPES[FundraiserType.RECURRING_DONATION] = "Recurring donation";

const FUNDRAISER_STATUS: any = {};
FUNDRAISER_STATUS[FundRaiserStatus.ACTIVE] = "Active";
FUNDRAISER_STATUS[FundRaiserStatus.FULLY_FUNDED] = "Fully funded";
FUNDRAISER_STATUS[FundRaiserStatus.REPAYING] = "Repaying";
FUNDRAISER_STATUS[FundRaiserStatus.REPAID] = "Repaid";
FUNDRAISER_STATUS[FundRaiserStatus.CLOSED] = "Closed";

export const getFundRaiserType = (type: FundraiserType) => FUNDRAISER_TYPES[type] ?? "Unknown";
export const getFundRaiserStatus = (type: FundRaiserStatus) => FUNDRAISER_STATUS[type] ?? "Unknown";
