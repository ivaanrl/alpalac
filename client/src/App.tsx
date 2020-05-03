import React from 'react';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import EditItems from './components/editItems/EditItems';
import Category from './components/Category/Category';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import AdminRoute from './guards/AdminRoute';
import LoggedinRoute from './guards/LoggedinRoute';
import UserOrders from './components/UserOrders/UserOrders';
import ItemsSearch from './components/ItemsSearch/ItemsSearch';
import 'typeface-roboto';
import AllOrders from './components/AllOrders/AllOrders';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/category" component={Category} />
        <LoggedinRoute path="/checkout" Component={Checkout} />
        <LoggedinRoute path="/myOrders" Component={UserOrders} />
        <AdminRoute path="/editItems" Component={EditItems} />
        <AdminRoute path="/admin/orders" Component={Orders} />
        <AdminRoute path="/admin/allOrders" Component={AllOrders} />
        <Route path="/search/item" component={ItemsSearch} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
