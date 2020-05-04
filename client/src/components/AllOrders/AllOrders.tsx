import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  CircularProgress,
  createStyles,
  Theme,
} from '@material-ui/core';
import axios from '../../axios';
import Order, { orderProps as orderInterface } from '../Order/Order';
import InfiniteScroll from 'react-infinite-scroller';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      marginTop: '9vh',
    },
    orders: {
      marginTop: '60px',
      maxHeight: '60%',
      overflow: 'hidden',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        width: '0',
        height: '0',
      },
    },
    title: {
      marginTop: '3vh',
      fontSize: '36px',
      fontWeight: 'bold',
      paddingBottom: '-5px',
      width: '95%',
      margin: 'auto',
      textAlign: 'left',
      borderBottom: '1px solid #d9d4d4',
      marginLeft: '5%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '30%',
        width: '70%',
        fontSize: '40px',
      },
    },
  })
);

export interface allOrderInterface extends orderInterface {
  createdAt: string;
}

const AllOrders = () => {
  const classes = useStyles();

  const [orders, setOrders] = useState<allOrderInterface[]>([]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async function getIncompleteOrders() {
      const axiosResponse = await axios.get<allOrderInterface[]>(
        '/orders/admin/all_orders/0'
      );
      if (axiosResponse.status === 200) {
        setOrders(axiosResponse.data);
      }
    })();
  }, []);

  const handleScroll = async () => {
    const receivedOrders = await axios.get<allOrderInterface[]>(
      '/orders/admin/all_orders/' + page
    );
    const newOrders = orders;
    receivedOrders.data.forEach((item: allOrderInterface) => {
      newOrders.push(item);
    });
    setPage(page + 1);
    setOrders(newOrders);
    if (receivedOrders.status === 206) {
      setHasMore(false);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.title}>TODOS LOS PEDIDOS</div>
      <div className={classes.orders}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleScroll}
          hasMore={hasMore}
          loader={<CircularProgress key={1} />}
        >
          {orders.map((order) => {
            const {
              id,
              content,
              completed,
              address,
              firstname,
              lastname,
              createdAt,
              weight,
            } = order;
            return (
              <Order
                id={id}
                content={content}
                completed={completed}
                createdate={createdAt}
                address={address}
                firstname={firstname}
                lastname={lastname}
                weight={weight}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AllOrders;
