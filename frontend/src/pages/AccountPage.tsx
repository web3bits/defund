import "date-fns";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { NotificationType, useGlobalContext } from "../context/GlobalContext";
import { AccountDetails } from "../components/account/AccountDetails";
import { ADDRESS_ZERO, factoryAddress } from "../utils/FundRaiserUtils";
import * as factoryAbi from "../artifacts/contracts/DeFundFactory.sol/DeFundFactory.json";
import { useEffect, useState } from "react";
import { DepositFunds } from "../components/account/DepositFunds";
import { WithdrawFunds } from "../components/account/WithdrawFunds";
import BN from "bn.js";

export const AccountPage = () => {
  const { addNotification, setLoading } = useGlobalContext();
  const { user, chainId, network } = useMoralis();
  const [ethBalance, setEthBalance] = useState<BN>(new BN(0));

  const { runContractFunction, isFetching, isLoading } = useWeb3Contract({
    abi: factoryAbi.abi,
    contractAddress: factoryAddress,
    functionName: "getMyBalance",
  });

  const handleMoralisError = (err: string[] | Error | any) => {
    if (Array.isArray(err)) {
      err = err[0];
    }

    addNotification(NotificationType.ERROR, err?.message || err?.error || "" + err);
    setLoading(false);
  };

  const handleMoralisSuccess = (data: any) => {
    setEthBalance(data);
    setLoading(false);
  };

  useEffect(() => {
    runContractFunction({
      params: {
        params: {
          _token: ADDRESS_ZERO,
        },
      },
      onError: handleMoralisError,
      onSuccess: handleMoralisSuccess,
    }).then();
  }, [user?.id]);

  useEffect(() => {
    setLoading(isFetching || isLoading);
  }, [isFetching, isLoading]);

  return (
    <>
      <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
        Your account
      </Typography>
      <AccountDetails user={user} chainId={chainId} network={network} ethBalance={ethBalance} />
      <DepositFunds />
      {!ethBalance.isZero() && <WithdrawFunds ethBalance={ethBalance} address={user?.get("ethAddress")} />}
    </>
  );
};
