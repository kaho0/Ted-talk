// axiosPublic.js
import axios from 'axios';

const AxiosPublic = axios.create({
  baseURL: 'http://localhost:8000', // replace with your base URL
});

export default AxiosPublic;
