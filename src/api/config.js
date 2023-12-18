import axios from "axios";
export const API = axios.create({
  withCredentials: true,
  baseURL: "http://192.168.0.104:8080/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
