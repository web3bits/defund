import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Container } from "@mui/material";

export const Layout = () => {
  return (
    <>
      <Navigation />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Outlet />
      </Container>
    </>
  );
};
