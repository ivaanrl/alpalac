import React, { useEffect, useState } from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import Items from '../Items/Items';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from '../../axios';
import { itemInterface as Item } from '../Items/Item/Item';

import CircularProgress from '@material-ui/core/CircularProgress';

const Category = (props: RouteComponentProps) => {
  const { location } = props;

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const category = location.pathname.split('/')[2];
    (async function getItemsByCategory() {
      const items = await axios.get<Item[]>('/items/' + category);
      setItems(items.data);
      setIsLoading(false);
    })();
  }, [location]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        {isLoading ? (
          <CircularProgress style={{ marginTop: '50px' }} />
        ) : (
          <Items itemsArr={items} />
        )}
      </Container>
    </React.Fragment>
  );
};

export default withRouter(Category);
