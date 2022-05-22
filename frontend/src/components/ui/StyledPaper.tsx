import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { lighten, Paper, Theme } from "@mui/material";
import { PaperProps } from "@mui/material/Paper/Paper";

export const StyledPaper = ({ children, ...rest }: PaperProps): React.ReactElement => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        backgroundColor: lighten(theme.palette.background.default, 0.2),
        padding: 16,
      },
    })
  );
  const classes = useStyles();

  return (
    <Paper className={classes.paper} {...rest}>
      {children}
    </Paper>
  );
};
