import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

export interface item {
  name: string;
  price: number;
  id: string | undefined;
  quantity: number;
  index: number;
  fullWeightPrice: string | undefined;
  modifyItemPrice: (index: number, newPrice: number) => void;
  modifyItemQuantity: (index: number, newQuantity: number) => void;
  modifyFullWeightPrice: (index: number, newPrice: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      paddingBottom: '8px',
      borderBottom: '1px solid #C0C0C0',
      borderRadius: '5px',
      borderRight: '1px solid #edece8',
      borderLeft: '1px solid #edece8',
      margin: '7px',
    },
    itemText: {
      marginBottom: '7px',
      width: '10%',
    },
    item: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    itemName: {
      flexBasis: '15%',
      textAlign: 'left',
    },
    price: {
      flexBasis: '15%',
    },
    quantity: {
      width: '13%',
    },
  })
);

const Item = (props: item) => {
  const classes = useStyles();
  const {
    id,
    name,
    price,
    quantity,
    index,
    fullWeightPrice,
    modifyItemPrice,
    modifyItemQuantity,
    modifyFullWeightPrice,
  } = props;

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    modifyItemPrice(index, parseInt(e.target.value, 10));
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    modifyItemQuantity(index, parseInt(e.target.value, 10));
  };

  const handleFullWeightPriceChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    modifyFullWeightPrice(index, parseInt(e.target.value, 10));
  };

  return (
    <div className={classes.itemContainer}>
      <div
        className={
          classes.itemText + ' ' + classes.item + ' ' + classes.itemName
        }
      >
        {name}
      </div>
      <div className={classes.itemText + ' ' + classes.item}>{price}</div>
      <FormControl className={classes.price}>
        <InputLabel htmlFor={id}>Nuevo Precio</InputLabel>
        <Input
          id={`${id}-${price}`}
          className={classes.item}
          placeholder={`${price}`}
          type="number"
          onChange={handlePriceChange}
        />
      </FormControl>
      <div className={classes.itemText + ' ' + classes.item}>{quantity}</div>
      <FormControl className={classes.quantity}>
        <InputLabel htmlFor={`${id}-${quantity}`}>Cantidad</InputLabel>
        <Input
          id={`${id}-${quantity}`}
          className={classes.item}
          placeholder={`${quantity}`}
          type="number"
          onChange={handleQuantityChange}
        />
      </FormControl>
      <div className={classes.itemText + ' ' + classes.item}>
        {fullWeightPrice}
      </div>
      <FormControl className={classes.price}>
        <InputLabel htmlFor={id}>Nuevo Precio Orma</InputLabel>
        <Input
          id={`${id}-${fullWeightPrice}`}
          className={classes.item}
          placeholder={`${fullWeightPrice}`}
          type="number"
          onChange={handleFullWeightPriceChange}
        />
      </FormControl>
    </div>
  );
};

export default Item;
