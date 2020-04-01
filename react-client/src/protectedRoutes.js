import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoutes({ component: Component, ...rest }) {
  const authorized = useSelector(state => state.authorization.authorized);
  return (
    <Route
      {...rest}
      render={props => {
        if (authorized) {
          return <Component {...props} />;
        } else {
          return (
            <>
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location
                  }
                }}
              />
            </>
          );
        }
      }}
    />
  );
}
