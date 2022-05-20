import { Container } from "@mui/material";
import * as React from "react";
// import Typography from "@mui/material/Typography";
// import * as factoryAbi from "../../artifacts/contracts/DeFundFactory.sol/DeFundFactory.json";
// import { Button } from "@mui/material";
import { OpenFundRaisersList } from "../components/openfundraisers/OpenFundraisersList";
// import { useWeb3Contract } from "react-moralis";

// const factoryAddress = process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS!;

export const OpenFundRaisersPage = () => {
  // const { runContractFunction, data, error, isFetching, isLoading } = useWeb3Contract({
  //   contractAddress: factoryAddress,
  //   functionName: "createFundraiser",
  //   abi: factoryAbi.abi,
  //   params: {
  //     _type: 1,
  //     _category: 2,
  //     _name: "test 123",
  //     _description: "test 456",
  //     _endDate: 0,
  //   },
  // });

  // const handleClick = async () => {
  //   console.log("calling", factoryAddress);
  //   runContractFunction().then(console.log).catch(console.error);
  // };

  return (
    <Container>
      {" "}
      <OpenFundRaisersList />
    </Container>
  );
};
