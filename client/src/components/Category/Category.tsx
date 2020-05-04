import React, { useEffect, useState } from 'react';
import {
  CssBaseline,
  Container,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import Items from '../Items/Items';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from '../../axios';
import { itemInterface as Item } from '../Items/Item/Item';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';

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

const Category = (props: RouteComponentProps) => {
  const classes = useStyles();
  const { location } = props;

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const category = location.pathname.split('/')[2];

  useEffect(() => {
    (async function getItemsByCategory() {
      const items = await axios.get<Item[]>('/items/' + category + '/0');
      setItems(items.data);
      setIsLoading(false);
    })();
  }, [location, category]);

  const handleScroll = async () => {
    const receivedItems = await axios.get<Item[]>(
      '/items/' + category + '/' + page
    );
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

export default withRouter(Category);
