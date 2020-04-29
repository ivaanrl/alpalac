import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import {
  Container,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from "@material-ui/core";

export interface reviewPageProps {
  confirmPurchase: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      position: "relative",
      marginTop: "30px",
    },
    itemsContainer: {
      maxHeight: "60vh",
      overflowY: "scroll",
    },
    itemContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      border: "1px solid #B0B0B0",
      borderRadius: "5px",
      marginBottom: "10px",
    },
    price: {},
    name: {},
    image: {
      maxWidth: "70px",
    },
    buttonsContainer: {
      position: "absolute",
      right: 0,
    },
    continueShoppingButton: {
      marginRight: "25px",
    },
  })
);

const ReviewPage = (props: reviewPageProps) => {
  const classes = useStyles();
  const { confirmPurchase } = props;

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
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>
        {user.street} {user.number}
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
      <div>Precio total: {getTotalPrice()}</div>
      <Button color="secondary" variant="contained">
        Volver
      </Button>
      <Button color="primary" variant="contained" onClick={confirmPurchase}>
        Confirmar pedido
      </Button>
    </Container>
  );
};

export default ReviewPage;
