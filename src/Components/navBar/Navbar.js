import React from "react";

import { GoThreeBars } from "react-icons/go";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useState } from "react";
const Navbar = ({ ontoggleSidebar, isSidebarOpen }) => {
  console.log(isSidebarOpen, "wewewe");
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "10%",
        justifyContent: "left",
        alignItems: "center",
      }}
    >
      <div>
        <button className="sidebar-toggle" onClick={ontoggleSidebar}>
          {isSidebarOpen ? (
            <MdOutlineKeyboardBackspace size={21} />
          ) : (
            <GoThreeBars size={21} />
          )}
        </button>
      </div>
      <div>
        <h3>NavBar</h3>
      </div>
    </div>
  );
};
export default Navbar;
