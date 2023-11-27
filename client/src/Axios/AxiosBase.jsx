// axiosPublic.js
import axios from 'axios';

const AxiosPublic = axios.create({
  baseURL: 'http://localhost:8000',
});

export default AxiosPublic;
