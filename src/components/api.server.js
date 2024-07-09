import axios from "axios";

const baseUrl = "http://13.60.80.160:8000/api";
export const ApiService = {
  async postData(url, data) {
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
