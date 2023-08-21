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
import appMessages from "./i18n";
import App from "./App";
import { HelmetProvider } from 'react-helmet-async';



subscribe(APP_READY, () => {
  ReactDOM.render(
    <React.StrictMode>
      <HelmetProvider>
        <AppProvider> 
        
          <App />
        </AppProvider>
      </HelmetProvider> 
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