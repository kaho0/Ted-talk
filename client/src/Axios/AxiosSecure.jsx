import axios from 'axios';

const AxiosSecure = axios.create({
  baseURL: 'https://tagtalk-server.onrender.com',
 withCredentials:true
});

export default AxiosSecure;
