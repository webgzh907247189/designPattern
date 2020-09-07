import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import Counter from "./components/Counter";

import store from "./store";
console.log(store, "store");

ReactDom.render(
    <Provider store={store}>
        <Counter />
    </Provider>,
  document.getElementById("root")
);
