import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "../context/auth-context";
import { FunctionsProvider } from "../context/functionsMisProductosContext.tsx";
import { FunctionsAgregarProvider } from "../context/functionsAgregrarProductosContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <FunctionsProvider>
        <FunctionsAgregarProvider>
          <App />
        </FunctionsAgregarProvider>
      </FunctionsProvider>
    </AuthProvider>
  </React.StrictMode>
);
