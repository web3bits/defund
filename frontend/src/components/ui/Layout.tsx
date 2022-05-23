import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Backdrop, CircularProgress, Container } from "@mui/material";
import { useGlobalContext } from "../../context/GlobalContext";
import { Notifications } from "./Notifications";
import { useMoralis } from "react-moralis";
import styles from "./Layout.module.css";
import { makeStyles } from '@mui/styles';

const useStyles: any = makeStyles((theme: any) => ({
  darkBg: {
    background: theme.palette.primary.main,
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // color: theme.palette.error.contrastText,
    // "&:hover": {
    //   backgroundColor: theme.palette.error.dark
    // },
    // "&:disabled": {
    //   backgroundColor: theme.palette.error.light
    // }
  },
  lightBg: {
    background: theme.palette.primary.light,
  }
}));

// const useStyles: any = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },
// });

export const Layout = () => {

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

  const { isLoading } = useGlobalContext();
  const classes = useStyles();

  return (
    <div className={isAuthenticated ? classes.lightBg : classes.darkBg}>
      <Navigation />
      {/* <div className={!isAuthenticated ? styles.mapContainer : styles.container}> */}
      <div className={styles.mapContainer}>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Notifications />
        <Container disableGutters maxWidth="lg" component="main" sx={{ py: 0 }}>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};
