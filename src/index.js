import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { TodoContextProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TodoContextProvider>
      <App />
      {/* <Route path="/*" element={<App />} /> */}
    </TodoContextProvider>
  </BrowserRouter>
);
