import { Button, CircularProgress } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import makeBlockie from "ethereum-blockies-base64";
import { NotificationType, useGlobalContext } from "../../context/GlobalContext";
import { ALLOWED_NETWORK } from "./RequireAuth";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

export const UserInfo = () => {
  const {
    authenticate,
    isAuthenticated,
    user,
    logout,
    isAuthenticating,
    isInitialized,
    authError,
    hasAuthError,
    isWeb3Enabled,
  } = useMoralis();
  const { chainId, switchNetwork } = useChain();
  const { addNotification } = useGlobalContext();
  const [isWrongNetwork, setWrongNetwork] = useState(false);

  useEffect(() => {
    if (hasAuthError && authError) {
      addNotification(NotificationType.ERROR, "Sorry, could not authorize...");
    }
  }, [hasAuthError]);

  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled && chainId !== ALLOWED_NETWORK) {
      addNotification(
        NotificationType.WARNING,
        "DeFund currently works only on Ethereum Kovan testnet. Please switch to Kovan!"
      );
      setWrongNetwork(true);
    } else {
      setWrongNetwork(false);
    }
  }, [chainId]);

  const useStyles = makeStyles(() =>
    createStyles({
      avatar: {
        height: "30px",
        marginRight: "1rem",
      },
    })
  );

  const classes = useStyles();

  const loginHandler = () => {
    authenticate().then();
  };

  const logoutHandler = () => {
    logout().then();
  };

  const switchNetworkHandler = () => {
    switchNetwork(ALLOWED_NETWORK).then();
  };

  if (!isInitialized) {
    return null;
  }

  if (isAuthenticated && isWrongNetwork) {
    return (
      <Button onClick={switchNetworkHandler} variant="contained" color="success" sx={{ mr: 1.5, ml: 3 }}>
        Switch to Kovan
      </Button>
    );
  }

  if (isAuthenticating) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <>
      {isAuthenticated && user ? (
        <>
          <Button onClick={logoutHandler} variant="contained" color="error" sx={{ mr: 1.5, ml: 3 }}>
            Sign out
          </Button>
          <img className={classes.avatar} src={makeBlockie(user.get("ethAddress"))} alt={user.get("ethAddress")} />{" "}
          <Link component={RouterLink} to="account" color="secondary">
            {user.get("username")}
          </Link>
        </>
      ) : (
        <Button onClick={loginHandler} variant="contained" color="info" sx={{ mr: 1.5, ml: 3 }}>
          Sign in
        </Button>
      )}
    </>
  );
};
