import axios from "axios";
import cookie from "react-cookies";
export const GetApi = (url) => {
  return new Promise((resolve, reject) => {
    const token = cookie.load("token");
    axios
      .get(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res) {
          resolve(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const postApi = (url) => {
  const token = cookie.load("token");
  axios
    .post("http://3.16.194.5:8000/api/v1/host/properties", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => console.log("posting data", res));
};
export const putApi = (url) => {
  const token = cookie.load("token");
  axios
    .put(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => console.log("updating", res));
};
