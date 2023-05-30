import cookie from "react-cookies";

export const checkCookie = () => {
  const cookieValue = cookie.load("token");

  return cookieValue;
};
export const selectArray = (array, key) => {
  let modifiedArray = [];
  array.map((item) => {
    let obj = {
      label: item.name,
      value: item[key],
    };
    modifiedArray.push(obj);
  });
  return modifiedArray;
};
