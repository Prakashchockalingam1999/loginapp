import React, { useEffect } from "react";
import "./Addpage.scss";
import { useState } from "react";
import Select from "react-select";
import { GetApi, postApi, putApi } from "../Apifunc";
import { selectArray } from "../../Utils";
import * as Yup from "yup";
import { object } from "prop-types";
import axios from "axios";
import cookie from "react-cookies";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const [states, setStates] = useState([]);

  const [cities, setCities] = useState([]);
  const [stateArray, setStateArray] = useState([]);
  const [cityArray, setCityArray] = useState([]);
  const [selectedCity, setselectedCity] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [homeType, sethomeType] = useState();
  const [manage, setManage] = useState();
  const [trackvalue, setTrackValue] = useState({
    streetname: "",
    zipcode: "",
    propertymanager: "",
    enteramount: "",
  });

  const optionsHomeType = [
    { value: "entire_home", label: "Entire home" },
    { value: "by_room", label: "By Room" },
  ];
  const Manageby = [
    { value: "self", label: "Host" },
    { value: "manager", label: "Manager" },
  ];
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      GetApi(`http://3.16.194.5:8000/api/v1/host/properties/${id}`).then(
        (res) => {
          let data = res.data.data.property;
          console.log(data);
          sethomeType(getCurrentObject(data.rental_type));
          setTrackValue({
            ...trackvalue,
            streetname: data.name,
            zipcode: data.address.zip,
            enteramount: data.commission,
          });

          setSelectedState({
            label: data.address.state.name,
            value: data.address.state.id,
          });
          setselectedCity({
            label: data.address.city.name,
            value: data.address.city.city_id,
          });

          setManage({ manage: data.manage_by });
        }
      );
    }
  }, []);
  useEffect(() => {
    console.log(homeType);
  }, [homeType]);
  const getCurrentObject = (key) => {
    let obj = optionsHomeType.find((x) => x.value === key);
    return obj;
  };

  useEffect(() => {
    GetApi("http://3.16.194.5:8000/api/v1/host/states").then((response) => {
      setStates(response.data.data.states);
      setStateArray(selectArray(response.data.data.states, "state_id"));
    });
  }, []);

  useEffect(() => {
    if (selectedState) {
      getCities();
    }
  }, [selectedState]);
  const getCities = () => {
    GetApi(` http://3.16.194.5:8000/api/v1/host/cities/${selectedState.value}`)
      .then((res) => {
        setCities(res.data.data.cities);
        setCityArray(selectArray(res.data.data.cities));
      })
      .catch((error) => console.log(error));
  };
  const handleChange2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTrackValue((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      console.log(errors);
    } else {
      let data = {
        name: trackvalue.streetname,
        address: {
          line_1: "geo location",
          city: { id: selectedCity.value, name: selectedCity.label },
          state: { id: selectedState.value, name: selectedState.label },
          zip: trackvalue.zipcode,
        },
        rental_type: homeType.value,
        manage_by: manage.value,
        commission: trackvalue.enteramount,
      };
      SendData(data);
      navigate("/prop");
    }
  };
  const SendData = (data) => {
    const token = cookie.load("token");
    if (id) {
      axios
        .patch(
          `http://3.16.194.5:8000/api/v1/host/properties/update/${id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } else {
      axios({
        method: "post",
        url: "http://3.16.194.5:8000/api/v1/host/properties",
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(alert("property Added "));
    }
  };
  const validation = () => {
    let errors = {};
    if (trackvalue.streetname === "") {
      errors.streetname = "street name required";
      setErrors({ ...errors });
      return true;
    }
    if (!selectedState) {
      errors.selectedState = "select state";
      setErrors({ ...errors });
      return true;
    }
    if (!selectedCity) {
      errors.selectedCity = "select city";
      setErrors({ ...errors });
      return true;
    }
    if (trackvalue.zipcode === "") {
      errors.zipcode = "Enter zipcode";
      setErrors({ ...errors });
      return true;
    }
    if (!homeType) {
      errors.hometype = "Select Hometype";
      setErrors({ ...errors });
      return true;
    }
    if (!manage) {
      errors.manageby = "Select Manager";
      setErrors({ ...errors });
      return true;
    }
    if (trackvalue.enteramount === "") {
      errors.enteramount = "enter amount";
      setErrors({ ...errors });
      return true;
    } else {
      return;
    }
  };

  return (
    <div className="all-add">
      <div className="all-ele-add ">
        <div className="sub-add">Basic Information</div>

        <div className="all-add-inputs">
          <div className="div-class-add">
            <div className="input-add">
              <div className="input-label" for="sname">
                Street Name*
              </div>
              <input
                onChange={handleChange2}
                type="text"
                id="streetname"
                name="streetname"
                placeholder="hello"
                value={trackvalue.streetname}
              />
              {errors.streetname && (
                <p style={{ fontSize: "10px", margin: "0px", color: "red" }}>
                  {errors.streetname}
                </p>
              )}
            </div>
            <div className="input-add">
              <div className="input-label">State*</div>
              <Select
                placeholder="select"
                options={stateArray}
                value={selectedState}
                id="state"
                onChange={(e) => {
                  setSelectedState(e);
                  setselectedCity("");
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: "0px",
                    borderWidth: "2px",
                    borderColor: "#e1e1e1",
                    fontSize: "14px",
                    boxShadow: "none",
                  }),
                  placeholder: (styles) => ({
                    ...styles,
                    color: "black",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "black",
                    backgroundColor: "none",
                    fontSize: "14px",
                    cursor: "pointer",
                  }),
                }}
              />
              {errors.selectedState && (
                <p style={{ fontSize: "10px", margin: "0px", color: "red" }}>
                  {errors.selectedState}
                </p>
              )}
            </div>
            <div className="input-add">
              <div className="input-label" for="">
                City*
              </div>
              <Select
                placeholder="select"
                options={cityArray}
                value={selectedCity}
                name={"selectedCity"}
                onChange={(e) => {
                  setselectedCity(e);
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: "0px",
                    borderWidth: "2px",
                    borderColor: "#e1e1e1",
                    fontSize: "14px",
                    boxShadow: "none",
                  }),
                  placeholder: (styles) => ({
                    ...styles,
                    color: "black",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "#1e2022",
                    backgroundColor: "none",
                    fontSize: "14px",
                    cursor: "pointer",
                  }),
                }}
              />
              {errors.selectedCity && (
                <p style={{ fontSize: "10px", margin: "0px", color: "red" }}>
                  {errors.selectedCity}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="all-add-inputs">
          <div className="div-class-add">
            <div className="input-add">
              <div className="input-label" for="sname">
                Zip*
              </div>
              <input
                onChange={handleChange2}
                type="text"
                id="zip"
                name="zipcode"
                value={trackvalue.zipcode}
              />
              {errors.zipcode && (
                <p style={{ fontSize: "10px", margin: "0px", color: "red" }}>
                  {errors.zipcode}
                </p>
              )}
            </div>
            <div className="input-add">
              <div className="input-label" for="sname">
                Home Type*
              </div>
              <Select
                placeholder="select"
                options={optionsHomeType}
                value={homeType}
                onChange={(e) => {
                  sethomeType(e);
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: "0px",
                    borderWidth: "2px",
                    borderColor: "#e1e1e1",
                    fontSize: "14px",
                    boxShadow: "none",
                  }),
                  placeholder: (styles) => ({
                    ...styles,
                    color: "black",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "#1e2022",
                    backgroundColor: "none",
                    fontSize: "14px",
                    cursor: "pointer",
                  }),
                }}
              />
            </div>
            <div className="input-add">
              <div className="input-label" for="sname">
                Manage By*
              </div>
              <Select
                placeholder="select"
                options={Manageby}
                value={manage}
                onChange={(e) => {
                  setManage(e);
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: "0px",
                    borderWidth: "2px",
                    borderColor: "#e1e1e1",
                    fontSize: "14px",
                    boxShadow: "none",
                  }),
                  placeholder: (styles) => ({
                    ...styles,
                    color: "black",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "#1e2022",
                    backgroundColor: "none",
                    fontSize: "14px",
                    cursor: "pointer",
                  }),
                  ClearIndicator: (styles) => ({ ...styles }),
                }}
              />
            </div>
          </div>
        </div>
        <div className="all-add-inputs">
          <div className="div-class-add">
            <div className="input-add">
              <div className="input-label" for="sname">
                Property Manager*
              </div>
              <Select
                placeholder="select"
                // options={data}
                // onChange={handleChange}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: "0px",
                    borderWidth: "2px",
                    borderColor: "#e1e1e1",
                    fontSize: "14px",
                    boxShadow: "none",
                  }),
                  placeholder: (styles) => ({
                    ...styles,
                    color: "black",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "#1e2022",
                    backgroundColor: "none",
                    fontSize: "14px",
                    cursor: "pointer",
                  }),
                }}
              />
              {errors.propertymanager && (
                <p style={{ fontSize: "10px", margin: "0px", color: "red" }}>
                  {errors.propertymanager}
                </p>
              )}
            </div>
            <div className="input-add">
              <div className="input-label" for="sname">
                Commission Mode*
              </div>
              <Select
                placeholder="select"
                // options={data}
                // onChange={handleChange}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: "0px",
                    borderWidth: "2px",
                    borderColor: "#e1e1e1",
                    fontSize: "14px",
                    boxShadow: "none",
                  }),
                  placeholder: (styles) => ({
                    ...styles,
                    color: "black",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "#1e2022",
                    backgroundColor: "none",
                    fontSize: "14px",
                    cursor: "pointer",
                  }),
                }}
              />
            </div>
            <div className="input-add">
              <div className="input-label" for="sname">
                Enter Amount*
              </div>
              <input
                onChange={handleChange2}
                type="text"
                value={trackvalue.enteramount}
                id="enteramount"
                name="enteramount"
              />
              {errors.enteramount && (
                <p style={{ fontSize: "10px", margin: "0px", color: "red" }}>
                  {errors.enteramount}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="all-add-inputs">
          <div className="div-class-add">
            <div className="input-add">
              <div className="input-label" for="sname">
                Rental Type*
              </div>
              <Select
                placeholder="select"
                // options={}
                // onChange={ }
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: "0px",
                    borderWidth: "2px",
                    borderColor: "#e1e1e1",
                    fontSize: "14px",
                    boxShadow: "none",
                  }),
                  placeholder: (styles) => ({
                    ...styles,
                    color: "black",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "#1e2022",
                    backgroundColor: "none",
                    fontSize: "14px",
                    cursor: "pointer",
                  }),
                }}
              />
            </div>
            <div className="input-add">
              <div style={{ display: "flex", justifyContent: "right" }}>
                <button
                  className="add-submit"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
