import axios from "axios";
import { getCookie } from "cookies-next/client";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = getCookie("token"); // or from cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
