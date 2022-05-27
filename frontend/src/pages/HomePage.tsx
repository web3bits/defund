import * as React from "react";
import { Typography, Box, Container } from "@mui/material";
import ethereum from "../images/ethereum.gif";
import { useMoralis } from "react-moralis";

export const HomePage = () => {
  const { isAuthenticated, user } = useMoralis();

  return (
    <Container disableGutters maxWidth="sm" component="main" sx={{ py: 10, textAlign: "center" }}>
      <Typography
        component="h1"
        variant="h2"
        color={isAuthenticated && user ? "primary.dark" : "primary.light"}
        gutterBottom
      >
        <Box sx={{ fontWeight: 900 }}>
          {isAuthenticated && user ? "WELCOME TO DEFUND" : "DEFUND IS DECENTRALIZED FUNDRAISER"}
        </Box>
      </Typography>
      <Typography component="p" color="primary.light">
        <Box sx={{ fontWeight: 500 }}>
          {!isAuthenticated &&
            !user &&
            "DeFund is a decentralized platform based on blockchain technology that aims to connect Individuals and Users who needs extra support.!"}
        </Box>
      </Typography>
      {isAuthenticated && user && (
        <img src={ethereum} style={{ marginTop: "50px", width: "240px", height: "240px" }} alt="ethereum animation" />
      )}
    </Container>
  );
};
