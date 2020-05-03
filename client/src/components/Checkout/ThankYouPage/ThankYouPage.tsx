import React from 'react';
import { Container, makeStyles, createStyles, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    mainContainer: {
      marginTop: '9vh',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '34px',
      margin: 'auto',
      marginBottom: '50px',
    },
    content: {
      fontSize: '26px',
      margin: 'auto',
      marginBottom: '50px',
    },
    navLink: {
      color: 'inherit',
      textDecoration: 'none',
    },
  })
);

const ThankYouPage = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.mainContainer}>
      <div className={classes.title}>Gracias por su compra!</div>
      <div className={classes.content}>
        Su pedido está siendo procesado. Se le informará cuando esté listo.
      </div>
      <NavLink to="/" className={classes.navLink}>
        <Button fullWidth variant="contained" color="primary">
          Página principal
        </Button>
      </NavLink>
    </Container>
  );
};

export default ThankYouPage;
