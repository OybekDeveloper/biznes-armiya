import axios from "axios";

const baseUrl = "http://13.60.80.160:8000/api";
const register = JSON.parse(localStorage.getItem("register"));
export const ApiService = {
  async postData(url, data, register) {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json",
        ...(register && { Authorization: `Bearer ${register.access}` }),
      },
      data: JSON.stringify(data),
    });
    return response.data;
  },
  async getData(url) {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json",
        ...(register && { Authorization: `Bearer ${register.access}` }),
      },
    });
    return response.data;
  },
};
