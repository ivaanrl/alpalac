import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from '../../axios';
import UserOrder, {
  userOrderProps as orderInterface,
} from '../UserOrder/UserOrder';

const useStyles = makeStyles({
  mainContainer: {
    marginTop: '90px',
    maxHeight: '60%',
    overflow: 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: '0',
      height: '0',
    },
  },
  scrollable: {
    //position: 'absolute',
  },
});

const UserOrders = () => {
  const classes = useStyles();

  useEffect(() => {
    (async function getUserOrders() {
      const axiosResponse = await axios.get<orderInterface[]>(
        '/orders/get_orders'
      );
      console.log(axiosResponse);
      if (axiosResponse.status == 200) {
        setOrders(axiosResponse.data);
      }
    })();
  }, []);

  const [orders, setOrders] = useState<orderInterface[]>([]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.scrollable}>
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
