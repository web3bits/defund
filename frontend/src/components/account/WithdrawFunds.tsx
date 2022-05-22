import React from "react";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import Moralis from "moralis";
import { NotificationType, useGlobalContext } from "../../context/GlobalContext";
import { ADDRESS_ZERO, factoryAddress } from "../../utils/FundRaiserUtils";
import * as factoryAbi from "../../artifacts/contracts/DeFundFactory.sol/DeFundFactory.json";
import { StyledPaper } from "../ui/StyledPaper";
import BN from "bn.js";

export const WithdrawFunds = ({ ethBalance, address }: { ethBalance: BN; address: string }): JSX.Element | null => {
  const { addNotification, setLoading } = useGlobalContext();

  if (!address || !ethBalance) {
    return null;
  }

  const handleMoralisError = (err: string[] | Error | any) => {
    if (Array.isArray(err)) {
      err = err[0];
    }

    addNotification(NotificationType.ERROR, err?.message || err?.error || "" + err);
    setLoading(false);
  };

  const handleMoralisSuccess = () => {
    addNotification(
      NotificationType.SUCCESS,
      "Withdrawal is being processed! Please wait for Blockchain confirmation..."
    );
    setLoading(false);
  };

  const onClick = async () => {
    setLoading(true);
    try {
      const options = {
        contractAddress: factoryAddress,
        abi: factoryAbi.abi,
        functionName: "withdrawFunds",
        params: {
          _amount: ethBalance,
          _tokenAddress: ADDRESS_ZERO,
        },
      };
      try {
        await (Moralis as any).executeFunction(options);
        handleMoralisSuccess();
      } catch (e: any) {
        handleMoralisError(e);
      }
    } catch (e: any) {
      console.error(e);
      addNotification(
        NotificationType.ERROR,
        "An error has occurred while calling the contract. Please check browser console for details."
      );
    }
  };

  return (
    <StyledPaper sx={{ mt: 3 }}>
      <Typography component="h1" variant="h5">
        Withdraw funds (ETH)
      </Typography>
      <Typography component="p">
        You currently have {Moralis.Units.FromWei(ethBalance.toString(10))} ETH in your account. Click the button below
        to withdraw those funds.
      </Typography>
      <Alert severity="warning" sx={{ my: 2 }}>
        <AlertTitle>Warning!</AlertTitle>
        Your funds will be sent to the wallet that you're currently signed in with: <code>{address}</code>!
      </Alert>
      <Button size="large" color="primary" variant="contained" onClick={onClick}>
        Withdraw funds
      </Button>
    </StyledPaper>
  );
};
