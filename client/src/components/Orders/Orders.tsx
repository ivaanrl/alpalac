import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import axios from '../../axios';
import Order, { orderProps as orderInterface } from './Order/Order';

const Orders = () => {
  useEffect(() => {
    (async function getIncompleteOrders() {
      const axiosResponse = await axios.get<orderInterface[]>(
        '/incomplete_orders'
      );
      if (axiosResponse.status == 200) {
        setOrders(axiosResponse.data);
      }
    })();
  }, []);

  const [orders, setOrders] = useState<orderInterface[]>([]);

  return (
    <React.Fragment>
      <CssBaseline />
      {orders.map((order) => {
        const {
          id,
          content,
          completed,
          address,
          firstname,
          lastname,
          createdate,
        } = order;
        return (
          <Order
            id={id}
            content={content}
            completed={completed}
            createdate={createdate}
            address={address}
            firstname={firstname}
            lastname={lastname}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Orders;
