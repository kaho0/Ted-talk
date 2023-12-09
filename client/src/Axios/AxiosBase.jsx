// axiosPublic.js
import axios from 'axios';

const AxiosPublic = axios.create({
  baseURL: 'https://tagtalk-server.onrender.com',
});

export default AxiosPublic;
