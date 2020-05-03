import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  Container,
  makeStyles,
  createStyles,
  CircularProgress,
} from '@material-ui/core';
import { itemInterface as Item } from '../Items/Item/Item';
import axios from '../../axios';
import InfiniteScroll from 'react-infinite-scroller';
import Items from '../Items/Items';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: '5vh',
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
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async function getItemsByCategory() {
      const items = await axios.get<Item[]>('/items/get_all/0');
      console.log(items);
      setItems(items.data);
      setIsLoading(false);
    })();
  }, []);

  const handleScroll = async () => {
    const receivedItems = await axios.get<Item[]>('/items/get_all/' + page);
    const newItems = items;
    if (receivedItems.status === 202) {
      receivedItems.data.forEach((item: Item) => {
        newItems.push(item);
      });
      setPage(page + 1);
      setItems(newItems);
    } else if (receivedItems.status === 206) {
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
