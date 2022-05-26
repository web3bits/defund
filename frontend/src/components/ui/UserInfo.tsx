import { Button, CircularProgress, Popover, Box, Modal } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import makeBlockie from "ethereum-blockies-base64";
import { NotificationType, useGlobalContext } from "../../context/GlobalContext";
import { ALLOWED_NETWORK } from "./RequireAuth";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

export const UserInfo = () => {

  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      account: {
        border: "1px solid #fff",
        borderRadius: "3px",
        display: "flex",
        height: "30px",
        alignItems: "center",
        padding: "5px",
      },
      modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "centre",
        justifyContent: "center",
      },
    })
  );

  const classes = useStyles();

  const btnStyles: any = makeStyles((theme: any) => ({
    root: {
      borderRadius: 35,
      width: "120px",
      fontSize: "13px",
      border: "0px",
      padding: "10px 0px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    darkBg: {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark
      },
    },
    lightBg: {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark
      },
    }
  }));

  const btnClasses = btnStyles();

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
    return (
      <div style={{ width: "120px", textAlign: "center" }}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  // const style = {
  //   position: 'absolute' as 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };

  
  return (
    <>
      {isAuthenticated && user ? (
        <>
          {/* <Button variant="outlined"> */}
          <div className={classes.account}>
            <img className={classes.avatar} src={makeBlockie(user.get("ethAddress"))} alt={user.get("ethAddress")} />
            <Link component={RouterLink} to="/account" mr="15px" sx={{ color: isAuthenticated && "primary.light", textDecoration: "none" }}>
              Account
            </Link>
          </div>
          {/* </Button> */}
          <div onClick={handleOpen}>
            ☰
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className={classes.modal}>
              <Link component={RouterLink} to="/account" sx={{ color: isAuthenticated && "primary.light", textDecoration: "none" }}>
                {user.get("username")}
              </Link>
              <button onClick={logoutHandler} className={btnClasses.darkBg + " " + btnClasses.root}>
                LOGOUT
              </button>
            </div>
          </Modal>
          
        </>
      ) : (
        <button onClick={loginHandler} className={btnClasses.lightBg + " " + btnClasses.root}>
          LOGIN
        </button>
      )}
    </>
  );
};
