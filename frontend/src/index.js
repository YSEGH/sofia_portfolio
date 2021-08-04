import React from "react";
import ReactDOM from "react-dom";
import "./1-css/index.css";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Store";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
