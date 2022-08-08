import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./i18next";
import App from "./App";
import ReactDOM from "react-dom/client";

const loadingMarkup = <h3>Loading..</h3>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Suspense fallback={loadingMarkup}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);
