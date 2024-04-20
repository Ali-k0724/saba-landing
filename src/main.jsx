import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import AuthContext from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthContext>
      <App />
    </AuthContext>
    <AuthContext />
    <ToastContainer />
  </>
);
