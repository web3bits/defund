import * as React from "react";
import Typography from "@mui/material/Typography";

export const HomePage = () => {
  return (
    <>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        HOME PAGE
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        Wow it works
      </Typography>
    </>
  );
};
