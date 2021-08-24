import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { CONSTANTS } from "../../app/constants";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/store/authSlice";

export const ProtectedRoute: React.FC<RouteProps> = ({
  component,
  ...rest
}) => {
  const user = useAppSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && component ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: `${CONSTANTS.ROUTES.LOGIN_PAGE}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const PublicRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const user = useAppSelector(selectUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        user && component ? (
          <Redirect
            to={{
              pathname: `${CONSTANTS.ROUTES.DEFAULT}`,
            }}
          />
        ) : (
          React.createElement(component!, props)
        )
      }
    />
  );
};
