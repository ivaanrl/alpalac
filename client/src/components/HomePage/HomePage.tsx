import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  Container,
  makeStyles,
  createStyles,
  CircularProgress,
  Theme,
} from '@material-ui/core';
import { itemInterface as Item } from '../Items/Item/Item';
import axios from '../../axios';
import InfiniteScroll from 'react-infinite-scroller';
import Items from '../Items/Items';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: '5vh',

      [theme.breakpoints.down('sm')]: {
        paddingRight: '8px',
        paddingLeft: '8px',
      },
    },
    infiniteScroll: {
      overflowX: 'hidden',
      overflowY: 'hidden',
    },
  })
);

const HomePage = () => {
  const classes = useStyles();

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const items = await axios.get<Item[]>('/items/get_all/0');
    setItems(items.data);
    setIsLoading(false);
  };

  const handleScroll = async () => {
    const receivedItems = await axios.get<Item[]>('/items/get_all/' + page);
    const newItems = items;
    receivedItems.data.forEach((item: Item) => {
      newItems.push(item);
    });
    setPage(page + 1);
    setItems(newItems);
    if (receivedItems.status === 206) {
      setHasMore(false);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container} key="container">
        {isLoading ? (
          <CircularProgress style={{ marginTop: '50px' }} key={0} />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleScroll}
            hasMore={hasMore}
            loader={<CircularProgress key={1} />}
          >
            <Items itemsArr={items} key="items" />
          </InfiniteScroll>
        )}
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
