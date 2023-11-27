import useAuth from './useAuth';
import AxiosPublic from '../Axios/AxiosBase';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const GetCurrentUser = () => {
  const { user, loading } = useAuth();
  const [userdata, setuserdata] = useState({});

  const { data } = useQuery({
    queryKey: ['user'], // Include user.email in the queryKey
    enabled: !loading , // Enable query when not loading and user.email is available
    queryFn: async () => {
      const res = await AxiosPublic.get(`/user?email=${user.email}`);
      console.log(res.data);
      setuserdata(res.data);
      return res.data;
    },
  });

  return userdata;
};

export default GetCurrentUser;
