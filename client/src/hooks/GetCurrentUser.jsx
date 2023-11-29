import useAuth from './useAuth';
import AxiosPublic from '../Axios/AxiosBase';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const GetCurrentUser = () => {
  const { user, loading } = useAuth();
  const [userdata, setuserdata] = useState({});

  const { data } = useQuery({
    queryKey: ['user'], 
    enabled: !loading , 
    queryFn: async () => {
      const res = await AxiosPublic.get(`/user?email=${user.email}`);
      setuserdata(res.data);
      return res.data;
    },
  });

  return userdata;
};

export default GetCurrentUser;
