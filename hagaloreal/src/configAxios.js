import axios from "axios";

const iAx = axios.create({
  baseURL: "http://localhost:2000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

iAx.interceptors.request.use(
  (config) => {
    config.headers["Autorizacion"] = "esto es una autorizacion";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

iAx.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 404) {
      window.location.href = "/app";
    }
    return Promise.reject(error);
  }
);

export default iAx;
