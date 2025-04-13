import axios from "axios";

const instance = (TOKEN) => {
  return axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 1000,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST",
      "Access-Control-Allow-Headers":
        "X-Requested-With,content-type, Authorization",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export default instance;
