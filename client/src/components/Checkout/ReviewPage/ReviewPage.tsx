import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../reducers';
import {
  Container,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from '@material-ui/core';

export interface reviewPageProps {
  confirmPurchase: () => void;
  prevPage: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      //position: 'relative',
      marginTop: '30px',
    },
    itemsContainer: {
      maxHeight: '60vh',

      overflowY: 'scroll',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        width: '0',
        height: '0',
      },
    },
    itemContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      border: '1px solid #B0B0B0',
      borderRadius: '5px',
      marginBottom: '10px',
      padding: '5px',
    },
    userInfoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '35%',
      margin: 'auto',
      marginTop: '30px',
      marginBottom: '45px',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
    },
    userInfo: {
      width: '100%',
      flexBasis: '100%',
      textAlign: 'center',
      fontSize: '18px',
      margin: '15px',
    },
    price: {
      flexBasis: '15%',
      textAlign: 'left',
      fontWeight: 'bolder',
    },
    name: {
      fontWeight: 'bold',
      flexBasis: '40%',
      textAlign: 'left',
    },
    image: {
      maxWidth: '70px',
      flexBasis: '15%',
      borderRadius: '5px',
    },
    totalPriceDisplay: {
      fontSize: '20px',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '5px',
      padding: '7px',
      margin: '15px',
      textAlign: 'center',
      fontWeight: 'bolder',
    },
    buttonsContainer: {
      position: 'absolute',
      right: 0,
    },
    continueShoppingButton: {
      marginRight: '25px',
    },
    backButton: {
      marginRight: '20px',
    },
    smallText: {
      fontWeight: 'normal',
    },
  })
);

const ReviewPage = (props: reviewPageProps) => {
  const classes = useStyles();
  const { confirmPurchase, prevPage } = props;

  const user = useSelector((state: StoreState) => state.user);
  const shoppingCartItems = useSelector(
    (state: StoreState) => state.shoppingCart.shoppingCart
  );

  let totalPrice = 0;
  const getTotalPrice = () => {
    shoppingCartItems.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.userInfoContainer}>
        <div className={classes.userInfo}>
          <strong>Nombre: </strong>
          {user.firstName} {user.lastName}
        </div>
        <div className={classes.userInfo}>
          <strong>Dirección: </strong>
          {user.street} {user.number}
        </div>
        <div className={classes.userInfo}>
          <strong>Número de teléfono: </strong>
          {user.phoneNumber}{' '}
        </div>
      </div>
      <div className={classes.itemsContainer}>
        {shoppingCartItems.map((item, index) => {
          return (
            <div key={index} className={classes.itemContainer}>
              <img
                src={item.link}
                className={classes.image}
                alt="Imagen de item"
              />
              <div className={classes.name}>{item.name} </div>
              <div className={classes.price}>$ {item.price}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.totalPriceDisplay}>
        Precio total APROXIMADO: ${getTotalPrice()}
        <br></br>
        <small className={classes.smallText}>
          Se le enviará un mensaje de texto con el monto exacto en el momento en
          el que se confirme el pedido.
        </small>
      </div>
      <Button
        color="secondary"
        variant="contained"
        className={classes.backButton}
        onClick={prevPage}
      >
        Volver
      </Button>
      <Button color="primary" variant="contained" onClick={confirmPurchase}>
        Confirmar pedido
      </Button>
    </Container>
  );
};

export default ReviewPage;
