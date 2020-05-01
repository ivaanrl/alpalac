import React from 'react';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import EditItems from './components/editItems/EditItems';
import Category from './components/Category/Category';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/editItems" component={EditItems} />
        <Route path="/category" component={Category} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
