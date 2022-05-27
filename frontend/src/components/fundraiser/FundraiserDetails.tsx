import { Debug } from "../ui/Debug";
import * as React from "react";
import Moralis from "moralis";
import { FundraiserDetailsData } from "../../enums/FundRaiser";
import { StyledPaper } from "../ui/StyledPaper";
import { Alert, Skeleton } from "@mui/material";
import { sameAddress } from "../../utils/FundRaiserUtils";
import { FundraiserType } from "../../enums/FundRaiserType";
import { OneTimeDonation } from "../donation/OneTimeDonation";
import { ContentMarkdown } from "../ipfs-content/ContentMarkdown";
import { ContentImage } from "../ipfs-content/ContentImage";
import { CreateRecurringDonation } from "../donation/CreateRecurringDonation";
import { FundraiserWithdrawFunds } from "./FundraiserWithdrawFunds";
import { PageHeader } from "../ui/PageHeader";

interface FundraiserDetailsProps {
  user: Moralis.User | null;
  data?: FundraiserDetailsData;
  refreshFundraiserDetails?: () => void;
  isLoading: boolean;
}

export const FundraiserDetails = ({ data, user, refreshFundraiserDetails, isLoading }: FundraiserDetailsProps) => {
  if (isLoading) {
    return <Skeleton variant="rectangular" height={200} />;
  }
  if (!data) {
    return <Alert severity="error">Sorry, we couldn't fetch this fundraiser's details :(</Alert>;
  }

  const isOwner = sameAddress(data.owner, user?.get("ethAddress"));

  return (
    <>
      <PageHeader>{data.name}</PageHeader>
      <StyledPaper>
        {isOwner && <Alert>Looks like this is your fundraiser!</Alert>}
        {data.descriptions?.length > 0 && (
          <>
            {data.descriptions.map((item: string, _idx: number) => (
              <React.Fragment key={_idx}>
                <ContentMarkdown cid={item} />
                <hr />
              </React.Fragment>
            ))}
          </>
        )}
        {data.images?.length > 0 && (
          <>
            {data.images.map((item: string, _idx: number) => (
              <React.Fragment key={_idx}>
                <ContentImage cid={item} />
                <hr />
              </React.Fragment>
            ))}
          </>
        )}
      </StyledPaper>
      <StyledPaper sx={{ mt: 3 }}>
        <Debug input={{ ...data, ethBalanceAsString: Moralis.Units.FromWei(data.ethBalance.toString()) }} />
      </StyledPaper>

      {data.type !== FundraiserType.LOAN && <OneTimeDonation fundraiser={data} onDonation={refreshFundraiserDetails} />}
      {data.type === FundraiserType.RECURRING_DONATION && (
        <CreateRecurringDonation fundraiser={data} onDonation={refreshFundraiserDetails} />
      )}
      {isOwner && data.ethBalance.gt(0) && (
        <FundraiserWithdrawFunds fundraiser={data!} user={user!} onWithdrawal={refreshFundraiserDetails} />
      )}
    </>
  );
};
