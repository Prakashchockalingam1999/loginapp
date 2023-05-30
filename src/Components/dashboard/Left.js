import React from "react";
import { MdDashboard } from "react-icons/md";
import "./Dashboard.scss";
import { Link } from "react-router-dom";

import { BsPhoneLandscape } from "react-icons/bs";
import { TbTableOptions } from "react-icons/tb";
const Sidebar = () => {
  return (
    <div>
      <div className="left-bar">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="brand">Veritas</div>
          <div className="menu">Main Menu</div>
          <div>
            <div className="sub-menu">
              <Link
                to="/dash"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MdDashboard size={20} style={{ paddingRight: "7px" }} />
              </Link>

              <Link
                className="link-hide"
                style={{ textDecoration: "none", color: "black" }}
                to="/dash"
              >
                Dashboard
              </Link>
            </div>
            <div className="sub-menu">
              <Link
                to="/prop"
                style={{ textDecoration: "none", color: "black" }}
              >
                <BsPhoneLandscape size={20} style={{ paddingRight: "7px" }} />
              </Link>
              <Link
                className="link-hide"
                style={{ textDecoration: "none", color: "black" }}
                to="/prop"
              >
                Properties
              </Link>
            </div>
            <div className="sub-menu">
              <Link
                to="/details"
                style={{ textDecoration: "none", color: "black" }}
              >
                <TbTableOptions size={20} style={{ paddingRight: "7px" }} />
              </Link>
              <Link
                className="link-hide"
                style={{ textDecoration: "none", color: "black" }}
                to="/details"
              >
                Details
              </Link>
            </div>
            <div className="sub-menu">
              <Link
                to="/context"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MdDashboard size={20} style={{ paddingRight: "7px" }} />
              </Link>

              <Link
                className="link-hide"
                style={{ textDecoration: "none", color: "black" }}
                to="/context"
              >
                context
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
