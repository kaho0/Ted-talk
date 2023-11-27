import useAuth from '../../../hooks/useAuth';
import AxiosPublic from '../../../Axios/AxiosBase';
import { useQuery } from "@tanstack/react-query";

const ManagePosts = () => {
  const { user, loading } = useAuth();

  const { data} = useQuery({
    queryKey: ['cart'],
    enabled:!loading,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/blogs?email=${user.email}`)
      console.log(res.data)
      return res.data

    }
  })



  return (
    <div>
      {data && <p>{data.length}</p>}
    </div>
  );
};

export default ManagePosts;
