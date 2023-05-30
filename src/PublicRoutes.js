import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import cookie from "react-cookies";
import Login from "./Components/login/Login";
import React from "react";

const PublicRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route exact path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
export default PublicRoutes;
