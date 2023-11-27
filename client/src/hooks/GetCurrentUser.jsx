import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import AxiosPublic from '../Axios/AxiosBase';

const GetCurrentUser = () => {
  const { user, loading } = useAuth();
  const [userdata, setuserdata] = useState({});
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.email ) {
          const res = await AxiosPublic.get(`/user?email=${user.email}`);
          setuserdata(res.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return userdata;
};

export default GetCurrentUser;
