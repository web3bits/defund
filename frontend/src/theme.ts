import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    //background: {
      // default: "#ED82DE",
      //default: "#3D5A80",
    //},
    // primary: {
    //   main: "#BDCF3B",
    // },
    primary: {
      main: "#3D5A80",
      light: "#E0FBFC",
      dark: "#212939"
      //contrastText: "#262f3e",
    },
    secondary: {
      main: "#EC6C4D",
      
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
