import axios from 'axios';

const AxiosSecure = axios.create({
  baseURL: 'http://localhost:8000',
 withCredentials:true
});

export default AxiosSecure;
