import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./Components/PrivateRoutes";
import cookie from "react-cookies";
import PublicRoutes from "./PublicRoutes";
function App() {
  const checkCookie = () => {
    return cookie.load("token");
  };
  return (
    <div className="App">
      <BrowserRouter>
        {checkCookie() ? <PrivateRoutes /> : <PublicRoutes />}

      </BrowserRouter>
    </div>
  );
}

export default App;
