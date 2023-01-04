import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { createBrowserHistory } from 'history';
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const LazyAuthComponent = lazy(() => import("./components/AuthAppComponent"));
const LazyMarketingComponent = lazy(() =>
  import("./components/MarketingAppComponent")
);
const LazyDashboardComponent = lazy(() => import("./components/DashboardAppComponent"))
const history = createBrowserHistory();
export default () => {
  const [isSignIn, setIsSignedIn] = useState(false);
  const onSignIn = () => {
    console.log('sign in true');
    setIsSignedIn(true);
  }
  const onSignOut = () => {
    setIsSignedIn(false);
  }
 
  useEffect(() => {
    if (isSignIn) {
      history.push('/dashboard');
    }
  }, [isSignIn])
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header signedIn={isSignIn} onSignOut={ onSignOut} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <LazyAuthComponent onSignIn = {onSignIn} />
              </Route>
              <Route path="/dashboard">
                {!isSignIn && <Redirect to='/' />}
                <LazyDashboardComponent/>
              </Route>              
              <Route path="/" component={LazyMarketingComponent} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
