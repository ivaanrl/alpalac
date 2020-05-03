import React, { SyntheticEvent } from 'react';
import {
  TextField,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { FormikProps } from 'formik';

export interface FormValues {
  name: string;
  lastName: string;
  street: string;
  number: string;
  phoneNumber: string;
}

export interface checkoutFormProps {
  prevPage: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkoutForm: {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      minHeight: '50vh',
      maxWidth: '40%',
      padding: '20px',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '6px',
    },
    title: {
      margin: 'auto',
      marginTop: '3vh',
      marginBottom: '60px',
      fontSize: '40px',
      fontWeight: 'bold',
      paddingBottom: '-5px',
      width: '70%',
      marginLeft: '30%',
      textAlign: 'left',
      borderBottom: '1px solid #d9d4d4',
    },
  })
);

const CheckoutForm = (props: FormikProps<FormValues> & checkoutFormProps) => {
  const classes = useStyles();

  const {
    values: { name, lastName, street, number, phoneNumber },
    prevPage,
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
      <div className={classes.title}>INFORMACIÓN PERSONAL</div>
      <form onSubmit={handleSubmit} className={classes.checkoutForm}>
        <TextField
          id="name"
          name="name"
          label="Nombre"
          helperText={touched.name ? errors.name : ''}
          error={touched.name && Boolean(errors.name)}
          value={name}
          onChange={change.bind(null, 'name')}
          fullWidth
          disabled
        />

        <TextField
          id="lastName"
          name="lastName"
          label="Apellido"
          helperText={touched.lastName ? errors.lastName : ''}
          error={touched.lastName && Boolean(errors.lastName)}
          value={lastName}
          onChange={change.bind(null, 'lastName')}
          fullWidth
          disabled
        />

        <TextField
          id="street"
          name="street"
          label="Calle"
          helperText={touched.street ? errors.street : ''}
          error={touched.street && Boolean(errors.street)}
          value={street}
          onChange={change.bind(null, 'street')}
          fullWidth
        />

        <TextField
          id="number"
          name="number"
          label="Altura"
          helperText={touched.number ? errors.number : ''}
          error={touched.number && Boolean(errors.number)}
          value={number}
          onChange={change.bind(null, 'number')}
          fullWidth
        />

        <TextField
          id="phoneNumber"
          name="phoneNumber"
          label="Número de Teléfono "
          type="number"
          helperText={touched.phoneNumber ? errors.phoneNumber : ''}
          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
          value={phoneNumber}
          onChange={change.bind(null, 'phoneNumber')}
          fullWidth
        />

        <Button variant="contained" color="secondary" onClick={prevPage}>
          Volver
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Comprar
        </Button>
      </form>
    </React.Fragment>
  );
};

export default CheckoutForm;
