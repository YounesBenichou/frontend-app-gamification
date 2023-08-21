import "babel-polyfill";

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
} from "@edx/frontend-platform";
import { AppProvider, ErrorPage } from "@edx/frontend-platform/react";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";


import appMessages from "./i18n";

import "./index.scss";
// import About from "./Components/Course_About/Course_about";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

subscribe(APP_READY, () => {
  ReactDOM.render(
    <React.StrictMode>
    <AppProvider> 
      {/* <main> */}
        {/* <Switch>
          <Route path="*" component={LandingPage} /> */}
          {/* <Route path="/courses/:courseId/about" component={About} /> */}
          {/* <Route path="*" component={NotFoundPage} /> */}

        {/* </Switch> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </main> */}
    </AppProvider>
    </React.StrictMode>
    ,
    document.getElementById("root")
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById("root")
  );
});

initialize({
  messages: [appMessages],
});