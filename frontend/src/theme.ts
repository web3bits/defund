import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    background: {
      default: "#ED82DE",
    },
    primary: {
      main: "#BDCF3B",
    },
    secondary: {
      main: "#DD3F00",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
