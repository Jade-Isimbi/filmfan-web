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
      Authorization: `${TOKEN}`,
    },
  });
  // Create a new Axios instance with baseURL and default configurations
  // const instance = axios.create({
  //   baseURL: "https://api.themoviedb.org/3",
  //   timeout: 60000, // Set timeout to 60 seconds
  //   headers: {
  //     "content-type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET, POST",
  //     "Access-Control-Allow-Headers":
  //       "X-Requested-With,content-type, Authorization",
  //     // Authorization: `Bearer ${TOKEN}`,
  //   },
  // });

  // // Add a request interceptor to include the token in requests
  // instance.interceptors.request.use((config) => {
  //   if (TOKEN) {
  //     config.headers.Authorization = `${TOKEN}`;
  //   }
  //   return config;
  // });

  // // Add a response interceptor to handle errors
  // instance.interceptors.response.use(
  //   (response) => response,
  //   (error) => Promise.reject(error)
  // );

  // // Return the custom Axios instance
  // return instance;
};

export default instance;
