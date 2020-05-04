import React, { useState, useEffect } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from '../../axios';

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

export interface orderProps {
  id: string;
  content: { id: string; name: string; price: number; link: string }[];
  completed: boolean;
  createdate: string;
  address: string;
  firstname: string;
  lastname: string;
  weight: number;
}

export interface itemOrder {
  id: string;
  name: string;
  price: number;
  link: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      margin: 'auto',
      marginBottom: '10px',
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        width: '40%',
      },
    },
    openDialogButton: {
      width: '100%',
    },
    completedIcon: {
      marginLeft: '35px',
      color: '#0d47a1',
    },
    incompletedIcon: {
      marginLeft: '35px',
    },
    itemInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemsContainer: {
      overflowY: 'scroll',
    },
    price: {
      marginRight: '15px',
    },
    dialog: {
      minWidth: '80%',
      maxWidth: '100% !important',
    },
  })
);

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Order = (props: orderProps) => {
  const classes = useStyles();
  const {
    id,
    content,
    completed,
    address,
    firstname,
    lastname,
    createdate,
  } = props;
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isLoading, setIsLoading] = useState(false);

  let isCompletedIcon = <CancelIcon className={classes.incompletedIcon} />;

  if (isCompleted) {
    isCompletedIcon = (
      <CheckCircleIcon className={classes.completedIcon} color="inherit" />
    );
  }

  if (isLoading) {
    isCompletedIcon = <CircularProgress className={classes.completedIcon} />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let newPrice = 0;
    content.forEach((item: itemOrder) => {
      newPrice += item.price;
    });
    setTotalPrice(newPrice);
  }, [content]);

  const completeOrder = async () => {
    setIsLoading(true);
    const axiosResponse = await axios.post('/orders/admin/complete_order', {
      id,
    });

    if (axiosResponse.status === 201) {
      setIsCompleted(true);
      handleClose();
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.mainContainer}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className={classes.openDialogButton}
      >
        Pedido de {firstname} {lastname} ({createdate.substr(0, 10)}){' '}
        {isCompletedIcon}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="dialog-title" onClose={handleClose}>
          Pedido de {firstname} {lastname} ({createdate.substr(0, 10)})
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className={classes.itemsContainer}>
            {content.map((item: itemOrder, index) => {
              return (
                <div className={classes.itemInfo}>
                  <div>{item.name}</div>
                  <div className={classes.price}>$ {item.price} </div>
                </div>
              );
            })}
          </Typography>
          <Divider />
          <Typography gutterBottom>
            <div>
              <div>
                Nombre: {firstname} {lastname}
              </div>
              <div>Dirección: {address} </div>
              <div>Precio total aproximado: {totalPrice}</div>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
          <Button
            autoFocus
            variant="contained"
            onClick={completeOrder}
            color="primary"
          >
            Completar orden
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Order;
