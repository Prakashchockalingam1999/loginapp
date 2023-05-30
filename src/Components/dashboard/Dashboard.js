import React, { useState } from "react";
import "./Dashboard.scss";
import Dash from "./Dash";

import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Left";
import Properties from "./Properties";
import AddPage from "../AddPage/AddPage";
import DetailsComp from "../details2/DetailsComp";
import { GoThreeBars } from "react-icons/go";
import Nomatch from "./Nomatch";
import Navbar from "../navBar/Navbar";
import Contexttrain from "../contexttrain/Contexttrain";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <div>
      <div className="dashboard">
        <div className="over-all">
          <div
            className={` ${isSidebarOpen ? "left-side-bar" : "left-side-bar2"}`}
          >
            <Sidebar />
          </div>
          <div className="right-side-bar">
            <Navbar
              ontoggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
            <Routes>
              <Route path="/*" element={<Navigate to="/dash" replace />} />
              <Route exact path="/dash" element={<Dash />} />
              <Route path="/prop" element={<Properties />} />
              <Route path="/add" element={<AddPage />} />
              <Route path="/add/:id" element={<AddPage />} />
              <Route path="/details" element={<DetailsComp />} />
              <Route path="/context" element={<Contexttrain />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
