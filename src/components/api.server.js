import axios from "axios";

const baseUrl = "https://biznes-armiya-api.uz/api";
// const baseUrl = "http://13.51.161.74:8000/api";
export const ApiService = {
  async postData(url, data, token) {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    });
    return response.data;
  },
  async putData(url, data, token) {
    const response = await axios({
      method: "PUT",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    });
    return response.data;
  },
  async postMediaData(url, data, token) {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return response.data;
  },
  async putMediaData(url, data, token) {
    const response = await axios({
      method: "PUT",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return response.data;
  },
  async putMediaData(url, data, token) {
    const response = await axios({
      method: "PUT",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return response.data;
  },
  async getData(url, token) {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  async delData(url, token) {
    const response = await axios({
      method: "DELETE",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  async postRegisterData(url, data) {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response.data;
  },
  async getRegisterData(url) {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  async postRegister(url, data) {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response.data;
  },
};
