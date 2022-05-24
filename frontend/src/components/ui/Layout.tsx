import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Backdrop, CircularProgress, Container } from "@mui/material";
import { useGlobalContext } from "../../context/GlobalContext";
import { Notifications } from "./Notifications";
import { useMoralis } from "react-moralis";
import { makeStyles } from '@mui/styles';
import { RequireAuth } from "./RequireAuth";
import Image from '../../images/shokunin_World_Map.svg'; // Import using relative path
import { keyframes } from '@mui/system';

const spin = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-1692px, 0, 0);
  }
`;
const useStyles: any = makeStyles((theme: any) => ({
  root: {
    maxWidth: "1200px",
  },
  darkBg: {
    background: theme.palette.primary.main,
  },
  lightBg: {
    background: theme.palette.primary.light,
  },
  "@keyframes animate": {
    // "0%": {
    //   backgroundPosition: "0 0"
    // },
    "100%": {
      // backgroundPosition: "-10000px 0"
      backgroundPosition: "-3000px 0"
    }
  },
  mapContainer: {
    // position: "absolute",
    // top: "0",
    // left: "0",
    backgroundImage: `url(${Image})`,
    minHeight: 'calc(100vh - 130px)',
    width: '100%',
    // backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    // backgroundSize: 'cover',
    backgroundPosition: "0 0",
    backgroundSize: "auto 100%",
    margin: '0 auto',
    animation: `$animate 100s linear infinite`
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

  const { isAuthenticated } = useMoralis();
  const { isLoading } = useGlobalContext();
  const classes = useStyles();

  return (
    <div className={isAuthenticated ? classes.lightBg : classes.darkBg}>
      <Navigation />
      <div className={classes.mapContainer}>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Notifications />
        <RequireAuth>
          <Container disableGutters maxWidth="lg" component="main" sx={{ py: 0 }}>
            <Outlet />
          </Container>
        </RequireAuth>
      </div>
      <Footer />
    </div>
  );
};
