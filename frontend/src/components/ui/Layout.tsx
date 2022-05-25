import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Container } from "@mui/material";
import { Notifications } from "./Notifications";
import { GlobalSpinner } from "./GlobalSpinner";

export const Layout = () => {
  return (
    <>
      <GlobalSpinner />
      <Navigation />
      <Notifications />
      <Container disableGutters maxWidth="lg" component="main" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </>
  );
};
