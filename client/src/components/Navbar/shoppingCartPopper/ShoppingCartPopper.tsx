import React from 'react';
import {
  Popper,
  Theme,
  makeStyles,
  createStyles,
  Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../../reducers';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import allActions from '../../../actions';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px',
      border: `2px solid ${theme.palette.primary.light}`,
      padding: theme.spacing(1),
      backgroundColor: 'white',
      color: 'black',
      maxHeight: '400px',
      minHeight: '200px',
      minWidth: '420px',
      maxWidth: '420px',
      overflowY: 'scroll',
    },
    shoppingCartItemContainer: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #C0C0C0',
      borderRadius: '5px',
      borderRight: '1px solid #edece8',
      borderLeft: '1px solid #edece8',
      padding: '7px',
      marginBottom: '5px',
    },
    image: {
      maxWidth: '40px',
      borderRadius: '6px',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    name: {},
    price: {},
    resume: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '420px',
      backgroundColor: `${theme.palette.primary.main}`,
      borderBottomRightRadius: '6px',
      borderBottomLeftRadius: '6px',
    },
    totalPrice: {},
    viewCartButton: {
      fontSize: '12px',
      marginTop: '5px',
      marginBottom: '5px',
    },
    link: {
      textDecoration: 'none',
    },
    deleteItemButton: {
      maxWidth: '30px',
    },
  })
);

const ShoppingCartPopper = (props: {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleShoppingCartIconClick: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}) => {
  const classes = useStyles();
  const { open, anchorEl, handleShoppingCartIconClick } = props;
  const dispatch = useDispatch();
  const shoppingCart = useSelector(
    (state: StoreState) => state.shoppingCart.shoppingCart
  );

  const deleteShoppingCartItem = (index: number) => {
    dispatch(allActions.removeFromShoppingCart({ index }));
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    shoppingCart.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  return (
    <Popper
      placement="bottom"
      disablePortal={true}
      open={open}
      anchorEl={anchorEl}
      modifiers={{
        flip: {
          enabled: false,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: 'scrollParent',
        },
      }}
    >
      <div className={classes.paper}>
        {shoppingCart.map((item, index) => {
          return (
            <div className={classes.shoppingCartItemContainer} key={index}>
              <img
                src={item.link}
                className={classes.image}
                alt={'imagen de item'}
              />
              <div className={classes.textContainer}>
                <div className={classes.name}>{item.name}</div>
                <div className={classes.price}>$ {item.price}</div>
              </div>
              <Button
                color="primary"
                variant="contained"
                onClick={() => deleteShoppingCartItem(index)}
                className={classes.deleteItemButton}
              >
                <DeleteForeverIcon />
              </Button>
            </div>
          );
        })}
      </div>
      <div className={classes.resume}>
        <div className={classes.totalPrice}>Total: ${getTotalPrice()}</div>
        <NavLink to="/checkout" className={classes.link}>
          <Button
            color="secondary"
            variant="outlined"
            className={classes.viewCartButton}
            onClick={handleShoppingCartIconClick}
          >
            Continuar compra
          </Button>
        </NavLink>
      </div>
    </Popper>
  );
};

export default ShoppingCartPopper;
