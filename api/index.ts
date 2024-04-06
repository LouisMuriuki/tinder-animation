import { axiosInstance } from "../axios";

export const fetchAllShips = async () => {
  const response = await axiosInstance.get("rockets");
  return response.data;
};
