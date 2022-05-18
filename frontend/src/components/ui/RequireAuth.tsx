import { useChain, useMoralis } from "react-moralis";
import { CircularProgress, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Navigation } from "./Navigation";
import { Notifications } from "./Notifications";

export const ALLOWED_NETWORK = process.env.REACT_APP_ALLOWED_NETWORK || "0x2a";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isInitialized, isWeb3Enabled, enableWeb3 } = useMoralis();
  const { chainId } = useChain();
  const [isAuthorized, setAuthorized] = useState(false);
  const [isInitializing, setInitializing] = useState(true);

  useEffect(() => {
    if (isAuthenticated && isInitialized && isWeb3Enabled && chainId === ALLOWED_NETWORK) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    setInitializing(false);
  }, [isAuthenticated, isInitialized, isWeb3Enabled, chainId]);

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3().then();
    }
  }, [isWeb3Enabled]);

  if (isInitializing) {
    return <CircularProgress color="inherit" />;
  }

  if (!isAuthorized) {
    return (
      <>
        <Navigation />;
        <Notifications />;
        <Container disableGutters maxWidth="lg" component="main" sx={{ py: 2 }}>
          <Typography component="h1" variant="h2" color="text.primary" gutterBottom>
            Log in to see this page
          </Typography>
          <Typography component="p">
            To see this page you have to be logged in and connected to the correct network (Kovan).
          </Typography>
        </Container>
      </>
    );
  }

  return children;
}
