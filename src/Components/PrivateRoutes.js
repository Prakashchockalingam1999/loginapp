import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Nomatch from "./dashboard/Nomatch";
// import cookie from "react-cookies";
import React from "react";

const PrivateRoutes = () => {
  // function cookieready() {
  //   const cookieValue = cookie.load("token");
  //   console.log(cookieValue);
  //   return cookieValue;
  // }

  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route path="/*" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/*" replace />} />
      <Route path="/login" element={<Navigate to="/*" replace />} />
      {/* <Route path="*" element={<Nomatch />} /> */}
    </Routes>
  );
};
export default PrivateRoutes;
