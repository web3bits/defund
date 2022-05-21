import { Button, Grid, lighten, Paper, Theme } from "@mui/material";
import { Form } from "react-final-form";
import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

export interface GenericFormField {
  size: number;
  field: JSX.Element;
  hide?: (values: any) => boolean;
}

export interface CreateFundraiserFormProps {
  isDisabled?: boolean;
  showResetButton?: boolean;
  validate?: (values: any) => any;
  onSubmit?: (values: any) => void;
  initialValues?: any;
  fields: GenericFormField[];
}

export const GenericForm = ({
  fields,
  validate = () => {},
  onSubmit = () => {},
  initialValues = {},
  isDisabled = false,
  showResetButton = false,
}: CreateFundraiserFormProps): React.ReactElement => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formPaper: {
        backgroundColor: lighten(theme.palette.background.default, 0.2),
        padding: 16,
      },
    })
  );

  const classes = useStyles();
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Paper className={classes.formPaper}>
            <Grid container alignItems="flex-start" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {fields
                  .filter((item) => (typeof item.hide === "function" ? !item.hide(values) : true))
                  .map((item, idx) => (
                    <Grid item xs={item.size} key={idx}>
                      {item.field}
                    </Grid>
                  ))}
              </LocalizationProvider>
              {showResetButton ? (
                <Grid item style={{ marginTop: 16 }}>
                  <Button type="button" variant="contained" onClick={form.reset} disabled={submitting || pristine}>
                    Reset
                  </Button>
                </Grid>
              ) : (
                ""
              )}
              <Grid item style={{ marginTop: 16 }}>
                <Button variant="contained" color="primary" type="submit" disabled={submitting || isDisabled}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    />
  );
};
