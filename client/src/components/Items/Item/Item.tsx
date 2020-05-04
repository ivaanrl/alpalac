import React, { ChangeEvent, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import {
  InputLabel,
  Input,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch } from 'react-redux';
import allActions from '../../../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 340,
      margin: '35px',
      flex: 1,
      [theme.breakpoints.down('sm')]: {
        marginRight: '0',
        marginLeft: '0',
      },
    },
    media: {
      height: 140,
    },
    formControl: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      width: '100%',
    },
    inputCantidad: {
      width: '150px',
      marginLeft: '10px',
    },
    labelCantidad: {
      marginLeft: '10px',
    },
    addToShoppingListButton: {
      marginRight: '10px',
    },
    productTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    productName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'black',
    },

    pricePerKg: {
      fontSize: '16px',
      color: 'black',
      marginBottom: '10px',
    },
    actualPrice: {
      fontSize: '16px',
      color: 'black',
    },
    spacer: {
      height: '22px',
      width: '100%',
    },
    cardActions: {
      display: 'flex',
      flexDirection: 'column',
    },
    fullWeightPriceCheckbox: {
      alignSelf: 'flex-start',
    },
    checkBoxSpacer: {
      height: '42px',
      width: '150px',
    },
  })
);

export interface itemInterface {
  id: string;
  name: string;
  price: number;
  quantity: number;
  tags: string[];
  link: string;
  category: string;
  partitionable: boolean;
  fullWeightPrice?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Item(props: itemInterface) {
  const classes = useStyles();
  const {
    id,
    name,
    price,
    quantity,
    link,
    partitionable,
    fullWeightPrice,
  } = props;
  const dispatch = useDispatch();
  const [actualPrice, setActualPrice] = useState(0);
  const [partitionableCheck, setPartitionableCheck] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [weight, setWeight] = useState(0);

  const calculatePrice = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e) {
      let newPrice;
      const inputValue = parseInt(e.target.value, 10);
      if (partitionable) {
        newPrice = price * (inputValue / 1000);
      } else {
        newPrice = price * inputValue;
      }
      setWeight(inputValue);

      if (isNaN(newPrice)) {
        setActualPrice(0);
      } else {
        setActualPrice(Math.round((newPrice + Number.EPSILON) * 100) / 100);
      }
    }
  };

  const addToShoppingCart = () => {
    if (fullWeightPrice && actualPrice === parseFloat(fullWeightPrice)) {
      dispatch(
        allActions.addToShoppingCart({
          id,
          name: name + ' (orma completa)',
          price: actualPrice,
          link,
          weight,
        })
      );
    } else {
      dispatch(
        allActions.addToShoppingCart({
          id,
          name: name + ` (${weight} gr.)`,
          price: actualPrice,
          link,
          weight,
        })
      );
    }
  };

  const switchPartitionable = () => {
    if (!partitionableCheck && fullWeightPrice) {
      setActualPrice(parseFloat(fullWeightPrice));
    }
    if (partitionableCheck && fullWeightPrice) {
      setActualPrice(0);
    }
    setPartitionableCheck(!partitionableCheck);
    setInputDisabled(!inputDisabled);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={link}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"></Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="div"
            className={classes.productTextContainer}
          >
            <div className={classes.productName}>{name}</div>
            <div className={classes.pricePerKg}>
              Precio: <strong>$ {price}</strong> {partitionable ? '/kg' : null}
              <br></br>
              {partitionable ? (
                `Precio orma completa: $ ${fullWeightPrice}`
              ) : (
                <div className={classes.spacer} />
              )}
            </div>
            {actualPrice > 0 || partitionableCheck ? (
              <div className={classes.actualPrice}>
                Precio actual:{' '}
                <strong>
                  $ {partitionableCheck ? fullWeightPrice : actualPrice}
                </strong>
              </div>
            ) : (
              <div className={classes.spacer}></div>
            )}
            <div className={classes.pricePerKg}>
              Stock: <strong>{quantity}</strong>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        {partitionable ? (
          <FormControlLabel
            control={
              <Checkbox
                name="partitionable"
                color="primary"
                checked={partitionableCheck}
                onClick={switchPartitionable}
              />
            }
            label="Orma completa"
            labelPlacement="start"
            className={classes.fullWeightPriceCheckbox}
          />
        ) : (
          <div className={classes.checkBoxSpacer} />
        )}

        <FormControl className={classes.formControl}>
          <InputLabel
            htmlFor="my-input"
            className={classes.labelCantidad}
            disabled={inputDisabled}
          >
            {partitionable ? 'Cantidad en gramos' : 'Cantidad'}
          </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="number"
            className={classes.inputCantidad}
            onChange={calculatePrice}
            disabled={inputDisabled}
          />
          <Button
            size="small"
            color="primary"
            variant="contained"
            className={classes.addToShoppingListButton}
            onClick={addToShoppingCart}
            disabled={actualPrice <= 0 && !partitionableCheck}
          >
            <AddShoppingCartIcon />
          </Button>
        </FormControl>
      </CardActions>
    </Card>
  );
}
