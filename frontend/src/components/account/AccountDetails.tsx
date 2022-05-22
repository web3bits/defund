import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Grid, lighten, Paper, Theme } from "@mui/material";
import Moralis from "moralis";
import { MoralisContextValue } from "react-moralis";

interface AccountDetailsProps {
  user: Moralis.User | null;
  chainId: MoralisContextValue["chainId"];
  network: MoralisContextValue["network"];
  ethBalance?: string;
}

export const AccountDetails = ({ user, chainId, network, ethBalance }: AccountDetailsProps): React.ReactElement => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formPaper: {
        backgroundColor: lighten(theme.palette.background.default, 0.2),
        padding: 16,
      },
      label: {
        textAlign: "right",
      },
    })
  );

  const classes = useStyles();
  return (
    <Paper className={classes.formPaper}>
      <Grid container alignItems="flex-start" spacing={4}>
        <Grid item xs={2} className={classes.label}>
          <strong>User ID:</strong>
        </Grid>
        <Grid item xs={5}>
          <code>{user?.getUsername()}</code>
        </Grid>
        <Grid item xs={2} className={classes.label}>
          <strong>Network:</strong>
        </Grid>
        <Grid item xs={3}>
          <code>{network}</code>
        </Grid>

        <Grid item xs={2} className={classes.label}>
          <strong>Eth account:</strong>
        </Grid>
        <Grid item xs={5}>
          <code>{user?.get("ethAddress")}</code>
        </Grid>

        <Grid item xs={2} className={classes.label}>
          <strong>Chain ID:</strong>
        </Grid>
        <Grid item xs={3}>
          <code>{chainId}</code>
        </Grid>

        <Grid item xs={2} className={classes.label}>
          <strong>Your balance:</strong>
        </Grid>
        <Grid item xs={5}>
          <code>{ethBalance ?? 0} ETH</code>
        </Grid>
      </Grid>
    </Paper>
  );
};
