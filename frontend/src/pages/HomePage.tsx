import * as React from "react";
import { Typography, Box, Container } from "@mui/material";
import styles from "../styles/Home.module.css";

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <Container disableGutters maxWidth="sm" component="main" sx={{ py: 10, textAlign: "center" }}>
        <Typography component="h1" variant="h2" color="primary.light" gutterBottom>
          <Box sx={{ fontWeight: 900 }}>WELCOME IN DEFUND</Box>
        </Typography>
        <Typography component="p" color="primary.light">
          <Box sx={{ fontWeight: 500 }}>DeFund is a decentralized platform based on blockchain technology that aims to connect Individuals and Users who needs extra support.!</Box>
        </Typography>
      </Container>
    </div>
  );
};
