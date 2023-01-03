import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import Progress from "./components/Progress";
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const LazyAuthComponent = lazy(() => import("./components/AuthAppComponent"));
const LazyMarketingComponent = lazy(() =>
  import("./components/MarketingAppComponent")
);

export default () => {
  const [isSignIn, setIsSignedIn] = useState(false);
  const onSignIn = () => {
    console.log('sign in true');
    setIsSignedIn(true);
  }
  const onSignOut = () => {
    setIsSignedIn(false);
  }
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header signedIn={isSignIn} onSignOut={ onSignOut} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <LazyAuthComponent onSignIn = {onSignIn} />
              </Route>
              <Route path="/" component={LazyMarketingComponent} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
