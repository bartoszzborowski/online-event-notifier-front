import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  roles = null,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (!currentUser) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      const { admin: isAdmin } = currentUser;
      if (roles && !isAdmin) {
        return <Redirect to={{ pathname: "/" }} />;
      }

      return <Component {...props} />;
    }}
  />
);
