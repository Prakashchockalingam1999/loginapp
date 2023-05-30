import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Properties.scss";
import { BsSearch } from "react-icons/bs";
import cookie from "react-cookies";
import { CiEdit } from "react-icons/ci";
import addimg from "./../../assets/addpage.png";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const [result, setResult] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getProperties(currentPage);
  }, [currentPage]);
  const getProperties = (currentPage) => {
    const token = cookie.load("token");
    axios
      .get(
        `http://3.16.194.5:8000/api/v1/host/properties?page=${currentPage}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => {
          setResult(res.data.data.properties);
        },
        [currentPage]
      );
  };

  const goToPreviousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  const navigate = useNavigate();

  function handleProceed(data) {
    navigate(`/add/${data}`);
    console.log(data);
  }
  console.log(currentPage, "jjjj");
  console.log(result, "kookok");

  return (
    <div className="prop-all">
      <div className="properties">
        <div className="prop-header">
          <div className="heading">Properties</div>
          <div>
            <button onClick={() => navigate("/add")} className="nxt-btn">
              Create
            </button>
          </div>
        </div>
        <div className="prop-content1">
          <div className="prop-prop">
            <div className="receiver">
              <span style={{ textAlign: "center", width: "100%" }}>Street</span>
            </div>
            <div className="type">Host</div>
            <div className="status"> Rent</div>
            <div className="date">Occupancy</div>
            <div className="amount">Room </div>
            <div className="invite">Invite</div>
            <div className="enable">Enable</div>
          </div>
        </div>

        {result &&
          result.map((item) => {
            return (
              <div>
                <div className="prop-content">
                  <div className="prop-prop-con">
                    <div className="receiver1">
                      <img className="prop-img" src={item.gallery} />
                      <p>{item.name}</p>
                    </div>
                    <div className="type1">{item.host.name}</div>

                    <div className="status1">{item.commission}</div>
                    <div className="date1">
                      <div className="pen">{item.rental_type}</div>
                    </div>
                    <div className="amount1">-</div>
                    <div className="invite1">-</div>
                    <div className="enable1">
                      <input type="checkbox" id="switch" class="checkbox" />
                      <label for="switch" class="toggle"></label>
                      <div onClick={() => handleProceed(item.property_id)}>
                        <CiEdit size={22} style={{ paddingRight: "50px" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <hr style={{ opacity: 0.2 }} />
              </div>
            );
          })}
        <div
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <button
            className="btn-properties"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="btn-properties"
            onClick={goToNextPage}
            disabled={result?.length < 10}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Properties;
// `http://3.16.194.5:8000/api/v1/host/properties?page=2&limit=10&p_type=rental`
