import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <App />
      <Toaster richColors />
    </Router>
  </React.StrictMode>
);
