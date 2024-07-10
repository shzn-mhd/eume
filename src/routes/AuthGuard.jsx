// AuthGuard.js
import { useFirebase } from 'contexts/FirebaseContextUpdated';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthGuard = ({ component: Component, ...rest }) => {
  const { user } = useFirebase();

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AuthGuard;
