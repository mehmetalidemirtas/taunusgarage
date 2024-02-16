import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig"; // firebaseConfig dosyanızı projenize uygun şekilde import edin
import UploadImage from "./UploadImage";
import { HashRouter, Route, Routes } from "react-router-dom";

initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/yukle" element={<UploadImage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
