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
import DeleteImage from "./DeleteImage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/yukle" element={<UploadImage />} />
        <Route path="/sil" element={<DeleteImage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
