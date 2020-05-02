import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from '../../axios';
import UserOrder, {
  userOrderProps as orderInterface,
} from '../UserOrder/UserOrder';

const useStyles = makeStyles({
  mainContainer: {
    marginTop: '9vh',
  },
  orders: {
    marginTop: '60px',
    maxHeight: '60%',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: '0',
      height: '0',
    },
  },
  title: {
    marginTop: '3vh',
    fontSize: '40px',
    fontWeight: 'bold',
    paddingBottom: '-5px',
    width: '70%',
    margin: 'auto',
    marginLeft: '30%',
    textAlign: 'left',
    borderBottom: '1px solid #d9d4d4',
  },
});

const UserOrders = () => {
  const classes = useStyles();

  useEffect(() => {
    (async function getUserOrders() {
      const axiosResponse = await axios.get<orderInterface[]>(
        '/orders/get_orders'
      );
      if (axiosResponse.status == 200) {
        setOrders(axiosResponse.data);
      }
    })();
  }, []);

  const [orders, setOrders] = useState<orderInterface[]>([]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.title}>MIS PEDIDOS</div>
      <div className={classes.orders}>
        {orders.map((order) => {
          const {
            id,
            content,
            completed,
            address,
            firstname,
            lastname,
            createdate,
            weight,
          } = order;
          return (
            <UserOrder
              id={id}
              content={content}
              completed={completed}
              createdate={createdate}
              address={address}
              firstname={firstname}
              lastname={lastname}
              weight={weight}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserOrders;
