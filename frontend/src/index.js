import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {io} from "socket.io-client";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from "./pages/Layout";

import AllChats from "./pages/AllChats";
import SingleChat from "./pages/SingleChat";
import ErrorPage from "./pages/ErrorPage";

export const socket = io("http://localhost:8000/", {
  reconnectionDelayMax: 10000,
  withCredentials: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllChats />} />
        <Route path="singleChat" element={<SingleChat />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
