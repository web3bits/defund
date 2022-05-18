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
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Outlet />
      </Container>
    </>
  );
};
