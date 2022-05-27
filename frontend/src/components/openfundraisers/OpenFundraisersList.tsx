import { Grid } from "@mui/material";
import { OpenFundRaiserItem } from "./OpenFundRaiserItem";

export const OpenFundRaisersList = ({ fundraisers }: { fundraisers: any[] }): JSX.Element => {
  if (!Array.isArray(fundraisers) || fundraisers.length === 0) {
    return <h1>There are no open fundraisers</h1>;
  }

  return (
    <Grid container>
      {fundraisers.map((fundRaiserItem: any) => (
        <OpenFundRaiserItem key={fundRaiserItem.id} item={fundRaiserItem} />
      ))}
    </Grid>
  );
};
