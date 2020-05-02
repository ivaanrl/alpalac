import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { itemInterface } from '../Items/Item/Item';
import axios from '../../axios';
import { Container, CircularProgress } from '@material-ui/core';
import Items from '../Items/Items';

const ItemsSearch = () => {
  const [items, setItems] = useState<itemInterface[]>([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchTerms = location.search.substr(13); //get only search terms

    (async function getItemsBySearch() {
      const items = await axios.get<itemInterface[]>(
        '/items/search/' + searchTerms
      );
      setItems(items.data);
      setIsLoading(false);
    })();
  }, [location]);

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <CircularProgress style={{ marginTop: '50px' }} />
      ) : (
        <Items itemsArr={items} />
      )}
    </Container>
  );
};

export default ItemsSearch;
