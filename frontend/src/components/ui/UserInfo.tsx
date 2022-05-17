import { Button } from "@mui/material";
import React from "react";
import { useMoralis } from "react-moralis";

export const UserInfo = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();

  if (!isAuthenticated) {
    return (
      <Button onClick={() => authenticate()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
        Login
      </Button>
    );
  }

  return <>Welcome {user?.get("username")}</>;
};
