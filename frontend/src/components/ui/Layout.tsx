import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Backdrop, CircularProgress, Container } from "@mui/material";
import { useGlobalContext } from "../../context/GlobalContext";
import { Notifications } from "./Notifications";

export const Layout = () => {
  const { isLoading } = useGlobalContext();
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navigation />
      <Notifications />
      <Container disableGutters maxWidth="lg" component="main" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </>
  );
};
