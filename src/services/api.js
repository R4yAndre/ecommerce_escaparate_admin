import axios from "axios";
import { authService } from "./authService";

export const api = axios.create({
  baseURL: "https://ecommerce-escaparate.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = authService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});