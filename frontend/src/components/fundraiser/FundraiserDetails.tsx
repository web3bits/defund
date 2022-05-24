import { Debug } from "../ui/Debug";
import * as React from "react";
import Moralis from "moralis";
import { FundraiserDetailsData } from "../../enums/FundRaiser";
import { StyledPaper } from "../ui/StyledPaper";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";

interface FundraiserDetailsProps {
  user: Moralis.User | null;
  data?: FundraiserDetailsData;
}

export const FundraiserDetails = ({ data, user }: FundraiserDetailsProps) => {
  if (!data) {
    return <Alert severity="error">Sorry, we couldn't fetch this fundraiser's details :(</Alert>;
  }

  return (
    <>
      <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
        {data.name}
      </Typography>
      <StyledPaper>
        <Debug input={{ data, user }} />
      </StyledPaper>
    </>
  );
};
