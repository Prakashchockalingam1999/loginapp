import React, { useEffect } from "react";
import "./Details.scss";
import { useState } from "react";
const DetailsComp = () => {
  const [inputs, setInputs] = useState([]);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputs];
    list[index][name] = value;
  };
  useEffect(() => {
    console.log(inputs);
  }, []);
  const handleAddInput = () => {
    if (inputs.length === 0) {
      newobj();
    } else {
      validateInputs();
    }
  };
  const validateInputs = () => {
    const newinputs = [...inputs];
    let error = false;
    for (let i = 0; i < newinputs.length; i++) {
      if (!newinputs[i].name) {
        console.log(newinputs[i].name);
        console.log(`${i} name Error`);
        error = true;
        break;
      } else if (!newinputs[i].age) {
        console.log(`${i}age Error`);
        error = true;
        break;
      } else if (!newinputs[i].role) {
        console.log(`${i}role Error`);
        error = true;
        break;
      } else {
      }
    }
    if (!error) newobj();
  };

  const newobj = () => {
    let obj = {
      name: "",
      age: "",
      role: "",
    };
    setInputs([...inputs, obj]);
  };

  const handlesubmit = (event, id) => {
    event.preventDefault();
    const list = [...inputs];
    setInputs(list);
  };

  const handleClick = (inputs, index) => {
    handleAddInput();
  };

  return (
    <div>
      <div className="all-details">
        <div style={{ padding: "0px 30px" }}>
          <div style={{ width: "100%" }}>
            <div className="details-header">
              <h2>Add Details</h2>
              <button
                style={{ padding: "5px 15px", margin: "10px" }}
                onClick={handleClick}
                className="add-in-btn"
              >
                Add Input
              </button>
            </div>

            <form onSubmit={handlesubmit}>
              <div>
                {inputs.map((input, index) => (
                  <div className="all-inputs " key={index}>
                    <div className="in-flex">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={(event) => handleChange(event, index)}
                      />
                      {/* {error.name && (
                        <p
                          style={{
                            fontSize: "10px",
                            margin: "0px",
                            color: "red",
                          }}
                        >
                          {error.name}
                        </p>
                      )} */}
                    </div>

                    <div className="in-flex">
                      <label>Age</label>
                      <input
                        type="text"
                        name="age"
                        value={inputs.age}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </div>
                    <div className="in-flex">
                      <label>Role</label>
                      <input
                        type="text"
                        name="role"
                        value={inputs.role}
                        onChange={(event) => handleChange(event, index)}
                      />
                    </div>
                  </div>
                ))}
                <button className="det-sub-btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <table
            style={{
              textAlign: "center",
              height: "50vh",
              width: "100%",
              backgroundcolor: "lightgrey",
            }}
          >
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Name</th>
                <th>Age</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {inputs &&
                inputs.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.role}</td>
                  </tr>
                ))}
               
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailsComp;
