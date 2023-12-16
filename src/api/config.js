import axios from "axios";
export const API = axios.create({
  withCredentials: true,
  baseURL: "http://192.168.100.58:8080/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
