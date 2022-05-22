import "date-fns";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { NotificationType, useGlobalContext } from "../context/GlobalContext";
import * as fundraiserAbi from "../artifacts/contracts/DeFund.sol/DeFund.json";
import { useEffect, useState } from "react";
import { Debug } from "../components/ui/Debug";
import { useParams } from "react-router-dom";

export const FundraiserDetailsPage = () => {
  const { address } = useParams();
  const { addNotification, setLoading } = useGlobalContext();
  const { user } = useMoralis();
  const [data, setData] = useState<any>({});

  const { runContractFunction, isFetching, isLoading } = useWeb3Contract({
    abi: fundraiserAbi.abi,
    functionName: "getAllDetails",
  });

  const handleMoralisError = (err: string[] | Error | any) => {
    if (Array.isArray(err)) {
      err = err[0];
    }

    addNotification(NotificationType.ERROR, err?.message || err?.error || "" + err);
    setLoading(false);
  };

  const handleMoralisSuccess = (data: any) => {
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    runContractFunction({
      params: {
        contractAddress: address,
      },
      onError: handleMoralisError,
      onSuccess: handleMoralisSuccess,
    }).then();
  }, [address]);

  useEffect(() => {
    setLoading(isFetching || isLoading);
  }, [isFetching, isLoading]);

  return (
    <>
      <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
        Fundraiser details
      </Typography>
      <Debug input={{ data, user }} />
    </>
  );
};
