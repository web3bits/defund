import { Grid, Paper, Typography } from "@mui/material";
import { memo } from "react";
import { getFundRaiserStatus, getFundRaiserType } from "../../utils/FundRaiserUtils";
import { OpenFundRaiser } from "./OpenFundRaiserInterface";
import { formatTimestamp } from "../../utils/DateUtils";

export const OpenFundRaiserItem = memo(({ item }: { item: OpenFundRaiser }) => {
  const { _name, _type, _category, _initialDescription, _endDate, _status } = item;
  const endDate = formatTimestamp(_endDate, "MM-DD-YYYY HH:mm:ss");
  return (
    <Paper
      elevation={3}
      sx={{
        padding: ".8rem",
        marginBottom: "1rem",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h5">{_name}</Typography>
      </Grid>
      <Grid item xs={12}>
        {getFundRaiserType(_type)} {">"} {_category} - {getFundRaiserStatus(_status)}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component="p">
          {_initialDescription}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" component="p">
          This fundraising ends on {endDate}
        </Typography>
      </Grid>
    </Paper>
  );
});
