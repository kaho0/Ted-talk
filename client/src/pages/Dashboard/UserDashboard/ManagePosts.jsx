import useAuth from '../../../hooks/useAuth';
import AxiosPublic from '../../../Axios/AxiosBase';
import { useQuery } from "@tanstack/react-query";
import UserblogCard from './UserblogCard';

const ManagePosts = () => {
  const { user, loading } = useAuth();

  const { data,refetch } = useQuery({
    queryKey: ['cart'],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/blogs?email=${user.email}`)
      console.log(res.data)
      return res.data

    }
  })



  return (

    <div>   <h1 className="text-3xl font-semibold m-4 text-center">Your Previous Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map(post => (
          <UserblogCard key={post._id} post={post} refetch={refetch} />
        ))}
      </div>
    </div>


  );
};

export default ManagePosts;
