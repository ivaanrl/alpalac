import axios from "axios";

export const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:5000";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
  headers,
});
