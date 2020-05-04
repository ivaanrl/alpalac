import React, { useCallback, useState } from 'react';
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
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      position: 'relative',
      marginTop: '30px',
      maxHeight: '95vh',
    },
    itemsContainer: {
      marginBottom: '20px',
      overflowY: 'scroll',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        width: '0%',
        background: 'transparent',
      },
      borderRadius: '5px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      maxHeight: '70vh',
      [theme.breakpoints.up('sm')]: {
        maxHeight: '80vh',
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
      margin: 'auto',
      [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        right: 0,
      },
    },
    backButton: {
      marginRight: '25px',
    },
    continueShoppingButton: {
      marginRight: '25px',
    },
    totalPriceContainer: {
      margin: 'auto',
      fontWeight: 'bold',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      marginBottom: '10px',
      [theme.breakpoints.up('sm')]: {
        fontSize: '26px',
        marginBottom: '0',
      },
    },
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
    aproximatedText: {
      marginLeft: '10px',
      textDecoration: 'underline',
      textDecorationStyle: 'dotted',
      textDecorationColor: '#555555',
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

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const shoppingCartItems = useSelector(
    (state: StoreState) => state.shoppingCart.shoppingCart
  );

  const deleteShoppingCartItem = (index: number) => {
    dispatch(allActions.removeFromShoppingCart({ index }));
    forceUpdate();
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    shoppingCartItems.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  return (
    <Container maxWidth="lg" className={classes.mainContainer}>
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
      </div>
      <div className={classes.totalPriceContainer}>
        Precio total
        <div
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          className={classes.aproximatedText}
        >
          APROXIMADO
        </div>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>
            Debido a la naturaleza de nuestros productos, calcular el monto
            exacto no es posible hasta no armar el pedido.<br></br> Será
            informado del monto exacto, una vez este haya sido preparado.
          </Typography>
        </Popover>
        : ${getTotalPrice()}
      </div>
      {shoppingCartItems.length === 0 ? (
        <div>No has agregado nada al carrito todavía!</div>
      ) : null}
      {getTotalPrice() < 500 ? <div>Precio minimo de compra: $500</div> : null}
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
          disabled={getTotalPrice() < 500}
        >
          Continuar
        </Button>
      </div>
    </Container>
  );
};

export default ShoppingCartFull;
