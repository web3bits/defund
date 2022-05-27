import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { OpenFundRaisersList } from "../components/openfundraisers/OpenFundraisersList";
import { factoryAddress } from "../utils/FundRaiserUtils";
import * as factoryAbi from "../artifacts/contracts/DeFundFactory.sol/DeFundFactory.json";
import { FundRaiserStatus } from "../enums/FundRaiserStatus";
import { NotificationType, useGlobalContext } from "../context/GlobalContext";
import { PageHeader } from "../components/ui/PageHeader";

const useOpenFundraisersPage = () => {
  const [openFundraisers, setOpenFundraisers] = useState([]);
  const { addNotification, setLoading } = useGlobalContext();
  const { runContractFunction, isFetching, isLoading } = useWeb3Contract({
    contractAddress: factoryAddress,
    functionName: "listFundraisersByStatus",
    abi: factoryAbi.abi,
  });

  const fetchOpenFundraisers = async () => {
    try {
      const result: any = await runContractFunction({
        params: {
          params: {
            _status: FundRaiserStatus.ACTIVE,
          },
        },
        onError: handleMoralisError,
      });
      setOpenFundraisers(result);
    } catch (e: any) {
      console.error(e);
      addNotification(
        NotificationType.ERROR,
        "An error has occurred while calling the contract. Please check browser console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMoralisError = (err: string[] | Error | any) => {
    if (Array.isArray(err)) {
      err = err[0];
    }

    addNotification(NotificationType.ERROR, err?.message || err?.error || "" + err);
  };

  useEffect(() => {
    fetchOpenFundraisers().then();
  }, []);

  return {
    loading: isLoading || isFetching,
    openFundraisers,
  };
};

export const OpenFundRaisersPage = () => {
  const { loading, openFundraisers } = useOpenFundraisersPage();
  if (loading) {
    return null;
  }

  return (
    <Container>
      <PageHeader>Open Fundraisers</PageHeader>
      <OpenFundRaisersList fundraisers={openFundraisers} />
    </Container>
  );
};
