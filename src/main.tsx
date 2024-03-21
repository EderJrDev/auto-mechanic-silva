import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      <Toaster richColors />
    </Router>
  </React.StrictMode>
);
