import { FundRaiserStatus } from "../enums/FundRaiserStatus";
import { FundraiserType } from "../enums/FundRaiserType";
import { FundraiserDetailsData } from "../enums/FundRaiser";
import { FundRaiserCategory } from "../enums/FundRaiserCategory";

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
export const factoryAddress = process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS!;
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const sameAddress = (a1: string, a2: string) => a1?.toLowerCase() === a2?.toLowerCase();

export const extractDetails = (data: any): FundraiserDetailsData | undefined => {
  if (!data || !Array.isArray(data) || data?.length !== 12) {
    return undefined;
  }

  try {
    return {
      id: data[0],
      owner: data[1],
      type: data[2] as FundraiserType,
      category: data[3] as FundRaiserCategory,
      endDate: new Date(1000 * data[4].toNumber()),
      goalAmount: data[5].toNumber(),
      descriptions: data[6],
      images: data[7],
      defaultImage: data[8].toNumber(),
      name: data[9],
      status: data[10] as FundRaiserStatus,
      ethBalance: data[11],
    };
  } catch (e: any) {
    console.error(e);
    return undefined;
  }
};
