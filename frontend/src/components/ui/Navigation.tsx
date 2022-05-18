import { AppBar, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import * as React from "react";
import { UserInfo } from "./UserInfo";

export const Navigation = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          DeFund
        </Typography>
        <nav>
          <Link component={RouterLink} variant="button" color="text.primary" to="/" sx={{ my: 1, mx: 1.5 }}>
            Home
          </Link>
          <Link component={RouterLink} variant="button" color="text.primary" to="/create" sx={{ my: 1, mx: 1.5 }}>
            Create a fundraiser
          </Link>
          <Link component={RouterLink} variant="button" color="text.primary" to="/fundraisers" sx={{ my: 1, mx: 1.5 }}>
            Open fundraisers
          </Link>
        </nav>
        <UserInfo />
      </Toolbar>
    </AppBar>
  );
};
