import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./Styles/commons.css";
import "./Styles/channel.css";

import { Store } from "./redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
    <ToastContainer />
  </Provider>
  // <React.StrictMode>
  //  </React.StrictMode>
);
