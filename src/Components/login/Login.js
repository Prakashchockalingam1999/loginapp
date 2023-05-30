import React, { useEffect, useState } from "react";
import "./Login.scss";
import { TfiEmail } from "react-icons/tfi";
import { BiLock } from "react-icons/bi";
// import img from "../../assets/SL-100820-36440-01.jpg"
// import profilepic from "./../../assets/blank-profile-picture-973460_960_720 (1).webp"
import pro2 from "../../assets/pro-2.webp";
import { json, useNavigate } from "react-router-dom";
// import Dashboard from '../dashboard/Dashboard'
import cookie from "react-cookies";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  // const navigate = useNavigate();
  const [data, setData] = useState();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Validation(inputs)) {
    } else {
      let data = {
        email: inputs.email,
        password: inputs.password,
      };
      Axios.post(`http://3.16.194.5:8000/api/v1/auth/host/signin`, data).then(
        (res) => {
          console.log(res, "response console");
          if (!res.data.success) {
            alert(res.data.message);
          } else {
            cookie.save("token", res.data.data.token);
            window.location.reload();
            notify()
          }
        }
      );
    }
  };
  function Validation(inputs) {
    let errors = {};
    if (inputs.email === "") {
      errors.email = "email required";
      setErrors({ ...errors });
      return true;
    } else if (inputs.password === "") {
      errors.password = "password required";
      setErrors({ ...errors });
      return true;
    } else return;
  }

  const notify = () => {
    toast.success(' logged in ', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div>
      <div className="all-login">
        <div className="pro-card">
          <form className="pro-sub" onSubmit={handleSubmit}>
            <img src={pro2} className="profile-pic" />
            <div className="in-head">
              <TfiEmail size={15} color="white" />
              <input
                className="input-box"
                name="email"
                placeholder="Email ID"
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <p style={{ fontSize: "10px", margin: "0px", color: "red" }}>
                {errors.email}
              </p>
            )}
            {/* <label>check your email</label> */}
            <div className="in-head">
              <BiLock size={18} color="white" />
              <input
                className="input-box"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <p style={{ fontSize: "10px", margin: "0px", color: "red" }}>
                {errors.password}
              </p>
            )}
            {/* <label>check your password</label> */}
            <div className="for-head">
              <div className="forgot">
                <div className="for-check">
                  <input type="checkbox" id="remember" />
                  <label className="rem" for="remember">
                    remember
                  </label>
                </div>
                <div className="for-check">
                  <a href="#" className="rem" style={{ fontStyle: "italic" }}>
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>
            <button className="btn-log">LOGIN</button>
            {/* <img  style={{width:"500px",height:"500px"}} src={img}/> */}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
