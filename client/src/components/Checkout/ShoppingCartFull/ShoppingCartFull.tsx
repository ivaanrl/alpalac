import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../reducers';
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Button,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import allActions from '../../../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      position: 'relative',
      marginTop: '30px',
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
    buttonsContainer: {
      position: 'absolute',
      right: 0,
    },
    backButton: {
      marginRight: '25px',
    },
    continueShoppingButton: {
      marginRight: '25px',
    },
  })
);

interface shoppingCartFullProps {
  nextPage: () => void;
  prevPage: () => void;
}

const ShoppingCartFull = (props: shoppingCartFullProps) => {
  const { nextPage, prevPage } = props;

  const classes = useStyles();

  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const dispatch = useDispatch();
  const shoppingCartItems = useSelector(
    (state: StoreState) => state.shoppingCart.shoppingCart
  );

  const deleteShoppingCartItem = (index: number) => {
    dispatch(allActions.removeFromShoppingCart({ index }));
    forceUpdate();
  };

  //const getTotalPrice = () => {
  //  let totalPrice = 0;
  //  shoppingCartItems.forEach((item) => {
  //    totalPrice += item.price;
  //  });
  //  return totalPrice;
  //};

  return (
    <Container maxWidth="lg" className={classes.mainContainer}>
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
            <Button
              color="primary"
              variant="contained"
              onClick={() => deleteShoppingCartItem(index)}
            >
              <DeleteForeverIcon />
            </Button>
          </div>
        );
      })}
      {shoppingCartItems.length === 0 ? (
        <div>No has agregado nada al carrito todavía!</div>
      ) : null}
      <div className={classes.buttonsContainer}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.backButton}
          onClick={prevPage}
        >
          Volver
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={nextPage}
          className={classes.continueShoppingButton}
        >
          Continuar
        </Button>
      </div>
    </Container>
  );
};

export default ShoppingCartFull;
