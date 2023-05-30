import React from "react";
import { Navbar } from "./navBar/Navbar";
import Dashboard from "./dashboard/Dashboard";
import { useState } from "react";

const Fun = () => {

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Dashboard isSidebarOpen={isSidebarOpen} />
    </>
  );
};

export default Fun;
