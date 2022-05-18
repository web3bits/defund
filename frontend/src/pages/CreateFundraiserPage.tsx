import * as React from "react";
import Typography from "@mui/material/Typography";
import * as factoryAbi from "../artifacts/contracts/DeFundFactory.sol/DeFundFactory.json";
import { Button } from "@mui/material";
import { useWeb3Contract } from "react-moralis";

const factoryAddress = process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS!;

export const CreateFundraiserPage = () => {
  const { runContractFunction, data, error, isFetching, isLoading } = useWeb3Contract({
    contractAddress: factoryAddress,
    functionName: "createFundraiser",
    abi: factoryAbi.abi,
    params: {
      _type: 1,
      _category: 2,
      _name: "test 123",
      _description: "test 456",
      _endDate: 0,
    },
  });

  const handleClick = async () => {
    console.log("calling", factoryAddress);
    runContractFunction().then(console.log).catch(console.error);
  };

  return (
    <>
      <Typography component="h1" color="text.primary" gutterBottom>
        Create a fundraiser
      </Typography>
      <Button variant="contained" color="info" onClick={handleClick} disabled={isFetching || isLoading}>
        Run on chain function
      </Button>
      <pre>{JSON.stringify({ data, error, isFetching, isLoading }, null, 2)}</pre>
    </>
  );
};
