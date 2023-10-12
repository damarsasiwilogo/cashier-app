import axios from "axios";

let baseURL = "http://localhost:8000";
const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL,
});

export default instance;
