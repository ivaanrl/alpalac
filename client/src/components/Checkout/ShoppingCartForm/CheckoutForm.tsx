import React, { SyntheticEvent } from "react";
import {
  TextField,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { FormikProps } from "formik";

export interface FormValues {
  name: string;
  lastName: string;
  street: string;
  number: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkoutForm: {
      marginTop: "3%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      minHeight: "50vh",
      maxWidth: "40%",
      padding: "20px",
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: "6px",
    },
    title: {
      margin: "auto",
      marginTop: "12%",
      fontSize: "24px",
      fontWeight: "bold",
    },
  })
);

const CheckoutForm = (props: FormikProps<FormValues>) => {
  const classes = useStyles();

  const {
    values: { name, lastName, street, number },
    errors,
    touched,
    handleSubmit,
    handleChange,
    //isValid,
    setFieldTouched,
  } = props;

  const change = (name: string, e: SyntheticEvent) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <React.Fragment>
      <div className={classes.title}>Información personal</div>
      <form onSubmit={handleSubmit} className={classes.checkoutForm}>
        <TextField
          id="name"
          name="name"
          label="Nombre"
          helperText={touched.name ? errors.name : ""}
          error={touched.name && Boolean(errors.name)}
          value={name}
          onChange={change.bind(null, "name")}
          fullWidth
          disabled
        />

        <TextField
          id="lastName"
          name="lastName"
          label="Apellido"
          helperText={touched.lastName ? errors.lastName : ""}
          error={touched.lastName && Boolean(errors.lastName)}
          value={lastName}
          onChange={change.bind(null, "lastName")}
          fullWidth
          disabled
        />

        <TextField
          id="street"
          name="street"
          label="Calle"
          helperText={touched.street ? errors.street : ""}
          error={touched.street && Boolean(errors.street)}
          value={street}
          onChange={change.bind(null, "street")}
          fullWidth
        />

        <TextField
          id="number"
          name="number"
          label="Altura"
          helperText={touched.number ? errors.number : ""}
          error={touched.number && Boolean(errors.number)}
          value={number}
          onChange={change.bind(null, "number")}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Comprar
        </Button>
      </form>
    </React.Fragment>
  );
};

export default CheckoutForm;
