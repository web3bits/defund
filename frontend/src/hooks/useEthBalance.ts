import { NotificationType, useGlobalContext } from "../context/GlobalContext";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import * as factoryAbi from "../artifacts/contracts/DeFundFactory.sol/DeFundFactory.json";
import { ADDRESS_ZERO, factoryAddress } from "../utils/FundRaiserUtils";
import BigNumber from "bignumber.js";

interface IUseEthBalance {
  ethBalance: BigNumber;
  ready: boolean;
  refreshBalance: () => void;
}

export const useEthBalance = (): IUseEthBalance => {
  const { addNotification } = useGlobalContext();
  const [ready, setReady] = useState(false);
  const [ethBalance, setEthBalance] = useState<BigNumber>(new BigNumber(0));
  const { user } = useMoralis();

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
    setReady(true);
  };

  const handleMoralisSuccess = (data: any) => {
    setEthBalance(data);
    setReady(true);
  };

  const refreshBalance = () => {
    if (!user?.id) {
      return;
    }
    runContractFunction({
      params: {
        params: {
          _token: ADDRESS_ZERO,
        },
      },
      onError: handleMoralisError,
      onSuccess: handleMoralisSuccess,
    }).then();
  };

  useEffect(() => {
    refreshBalance();
  }, [user?.id]);

  useEffect(() => {
    setReady(!isFetching && !isLoading);
  }, [isFetching, isLoading]);

  return {
    ethBalance,
    ready,
    refreshBalance,
  };
};
