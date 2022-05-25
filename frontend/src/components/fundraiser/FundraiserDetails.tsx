import { Debug } from "../ui/Debug";
import * as React from "react";
import Moralis from "moralis";
import { FundraiserDetailsData } from "../../enums/FundRaiser";
import { StyledPaper } from "../ui/StyledPaper";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import { sameAddress } from "../../utils/FundRaiserUtils";
import { FundraiserType } from "../../enums/FundRaiserType";
import { OneTimeDonation } from "../donation/OneTimeDonation";

interface FundraiserDetailsProps {
  user: Moralis.User | null;
  data?: FundraiserDetailsData;
  refreshFundraiserDetails?: () => void;
}

export const FundraiserDetails = ({ data, user, refreshFundraiserDetails }: FundraiserDetailsProps) => {
  if (!data) {
    return <Alert severity="error">Sorry, we couldn't fetch this fundraiser's details :(</Alert>;
  }

  return (
    <>
      {sameAddress(data.owner, user?.get("ethAddress")) && <Alert>Looks like this is your fundraiser!</Alert>}
      <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
        {data.name}
      </Typography>
      <StyledPaper>
        <Debug input={{ ...data, ethBalanceAsString: Moralis.Units.FromWei(data.ethBalance.toString()) }} />
      </StyledPaper>
      {data.type !== FundraiserType.LOAN && <OneTimeDonation fundraiser={data} onDonation={refreshFundraiserDetails} />}
    </>
  );
};
