import axios from "axios";

const apiAdmin = axios.create({
  baseURL: "http://localhost:8080/admin-filmscope/",
});

apiAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiAdmin;
