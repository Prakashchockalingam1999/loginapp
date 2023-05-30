import React from "react";
import "./Dashboard.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsFillCalendarDateFill } from "react-icons/bs";
import propic from "../../assets/pexels-pixabay-220453.jpeg";
import pot from "../../assets/portrait-4599553_640.jpg";
import dog from "../../assets/dog-3739225_640.jpg";

const Dash = () => {
  return (
    <div className="right-bar">
      <div className="all-right-elements">
        <div style={{ padding: "0px 30px" }}>
          <div className="right-header">
            <div className="analytics">
              <div className="right-title">Analytics</div>
              <div className="switch">
                <div className="white-btn">Full statictics</div>
                <div className="gray-btn">Result Summary</div>
              </div>
            </div>
            <div className="pro-icon">
              <div className="plus">
                <AiOutlinePlus />
              </div>
              <div className="pro-pic">
                <img src={propic} className="pic" />
              </div>
            </div>
          </div>
          <div className="all-card">
            <div className="card1">
              <div className="in-card">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="team-pay">
                    Team <br />
                    Payments
                  </div>
                  <div>
                    <IoMdNotifications size={20} />
                  </div>
                </div>
                <div className="cal">
                  <BsFillCalendarDateFill
                    style={{ color: "#5683e5" }}
                    size={15}
                  />{" "}
                  19 Dec approval
                </div>
                <div className="img-gr-div">
                  <img className="card-pro-pic1" src={propic} />
                  <img className="card-pro-pic2" src={pot} />
                  <img className="card-pro-pic3" src={dog} />
                  <div className="card-pro-pic4">+25</div>
                </div>
              </div>
            </div>
            <div className="card2">
              <div className="green-in-card">
                <div className="card2-1">
                  <div className="dollar">
                    <div>$95.5</div>
                    <div>ss</div>
                  </div>
                  <div className="month">
                    <div>Per Month</div>
                  </div>
                  <div className="plan">Choose Your Best Plan For You</div>
                </div>
                <div className="card2-2">
                  <button className="card-bt1">Details</button>
                  <button className="card-bt2">Upgrade</button>
                </div>
              </div>
            </div>
            <div className="card1">
              <div className="in-card">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="team-pay">
                    Team <br />
                    Payments
                  </div>
                  <div>
                    <IoMdNotifications size={20} />
                  </div>
                </div>
                <div className="cal">
                  <BsFillCalendarDateFill
                    style={{ color: "#5683e5" }}
                    size={15}
                  />{" "}
                  19 Dec approval
                </div>
                <div className="img-gr-div">
                  <img className="card-pro-pic1" src={propic} />
                  <img className="card-pro-pic2" src={pot} />
                  <img className="card-pro-pic3" src={dog} />
                  <div className="card-pro-pic4">+25</div>
                </div>
              </div>
            </div>
            <div className="card1">
              <div className="in-card">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="team-pay">
                    Team <br />
                    Payments
                  </div>
                  <div>
                    <IoMdNotifications size={20} />
                  </div>
                </div>
                <div className="cal">
                  <BsFillCalendarDateFill
                    style={{ color: "#5683e5" }}
                    size={15}
                  />{" "}
                  19 Dec approval
                </div>
                <div className="img-gr-div">
                  <img className="card-pro-pic1" src={propic} />
                  <img className="card-pro-pic2" src={pot} />
                  <img className="card-pro-pic3" src={dog} />
                  <div className="card-pro-pic4">+25</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
