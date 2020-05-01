import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../reducers';

export interface adminRouteProps {
  Component: () => JSX.Element;
  path: string;
}

const AdminRoute = (props: adminRouteProps) => {
  const { Component, path } = props;

  const user = useSelector((state: StoreState) => state.user);

  return (
    <Route
      path={path}
      render={() =>
        user.role === 'admin' ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
