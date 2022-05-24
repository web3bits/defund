import BN from "bn.js";
import { FundraiserType } from "./FundRaiserType";
import { FundRaiserCategory } from "./FundRaiserCategory";
import { FundRaiserStatus } from "./FundRaiserStatus";

export interface FundraiserDetailsData {
  id: BN;
  owner: string;
  type: FundraiserType;
  category: FundRaiserCategory;
  endDate: Date;
  goalAmount: number;
  descriptions: string[];
  images: string[];
  defaultImage: number;
  name: string;
  status: FundRaiserStatus;
  ethBalance: BN;
}
