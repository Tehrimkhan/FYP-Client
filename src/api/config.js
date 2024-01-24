import axios from "axios";
export const API = axios.create({
  withCredentials: true,
  baseURL: "https://tiny-erin-cod-hat.cyclic.app/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
