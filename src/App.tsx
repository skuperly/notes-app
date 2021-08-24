import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { CONSTANTS } from "./app/constants";
import { useAppDispatch } from "./app/hooks";
import { getUserAsync } from "./app/store/authSlice";
import { AppLoadingBar } from "./components/AppLoadingBar";
import { MainRoutes } from "./components/MainRoutes";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  return (
    <>
      <AppLoadingBar />
      <Switch>
        <PublicRoute
          exact
          path={CONSTANTS.ROUTES.LOGIN_PAGE}
          component={Login}
        />
        <PublicRoute
          exact
          path={CONSTANTS.ROUTES.REGISTER_PAGE}
          component={Register}
        />
        <ProtectedRoute path="/" component={MainRoutes} />
      </Switch>
    </>
  );
}

export default App;
