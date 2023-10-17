import axios from "axios";

const baseURL = "http://localhost:8000";
const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL,
  // Set common headers for every request, including the Bearer token
  headers: {
      Authorization: `Bearer ${token}`,
  },
});

export default instance;