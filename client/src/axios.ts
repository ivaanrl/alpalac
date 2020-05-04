import axios from 'axios';

export const API_ENDPOINT =
  process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:5000/api';
//process.env.REACT_APP_API_ENDPOINT ||

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export default axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
  headers,
});
