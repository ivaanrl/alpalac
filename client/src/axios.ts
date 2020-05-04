import axios from 'axios';

console.log(process.env.REACT_API_ENDPOINT);
console.log(process.env.NODE_ENV);
export const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export default axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
  headers,
});
