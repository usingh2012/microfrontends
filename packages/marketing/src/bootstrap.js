import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

//Mount function to start the app
const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();
  if (onNavigate) {
    history.listen(onNavigate); //communication from child to parent/container
  }
  ReactDOM.render(<App history={history} />, el);
  return {
      onParentNavigate({pathname : newPathname}) {
          console.log('from marketing on parent navigate');
          const { pathname } = history.location;
          if (pathname !== newPathname) {
              history.push(newPathname);
          }
    },
  };//for communication from container to child/marketing
};

if (process.env.NODE_ENV === "development") {
  //this id _marketing-dev-root will be available only development environment
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory : createBrowserHistory()});
  }
}

export { mount };
