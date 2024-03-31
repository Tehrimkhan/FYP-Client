import axios from "axios";
export const API = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:8080/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
