import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import AxiosPublic from "../Axios/AxiosBase";
import { useQuery } from '@tanstack/react-query';

const GetTotalposts = () => {

    const { user, loading } = useAuth()
    const [totalpost,settotalposts]=useState(0)
  const { data } = useQuery({
    queryKey: ['posts'], 
    enabled: !loading , 
    queryFn: async () => {
      const res = await AxiosPublic.get(`/userposts?email=${user.email}`);
      console.log('posts',res.data);
      settotalposts(res.data);
      return res.data;
    },
  });


    return totalpost

};

export default GetTotalposts;

  