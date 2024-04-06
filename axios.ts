import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.spacexdata.com/v4/",
  timeout: 10000,
});