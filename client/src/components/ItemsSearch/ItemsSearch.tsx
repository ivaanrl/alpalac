import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { itemInterface } from '../Items/Item/Item';
import axios from '../../axios';
import { Container, CircularProgress } from '@material-ui/core';
import Items from '../Items/Items';
import InfiniteScroll from 'react-infinite-scroller';

const ItemsSearch = () => {
  const [items, setItems] = useState<itemInterface[]>([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchTerms = location.search.substr(13); //get only search terms
  useEffect(() => {
    getItemsBySearch();
  }, [location, searchTerms]);

  const getItemsBySearch = async () => {
    const items = await axios.get<itemInterface[]>(
      '/items/search/' + searchTerms + '/0'
    );
    setItems(items.data);
    setIsLoading(false);
  };

  const handleScroll = async () => {
    const receivedItems = await axios.get<itemInterface[]>(
      '/items/search/' + searchTerms + '/' + page
    );
    const newItems = items;
    if (receivedItems.status === 202) {
      receivedItems.data.forEach((item: itemInterface) => {
        newItems.push(item);
      });
      setPage(page + 1);
      setItems(newItems);
    } else if (receivedItems.status === 206) {
      setHasMore(false);
    }
  };

  return (
    <Container maxWidth="lg" key="container">
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
  );
};

export default ItemsSearch;
