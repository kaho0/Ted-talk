import  { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import AxiosPublic from '../../../Axios/AxiosBase';

const ManagePosts = () => {
  const { user, loading } = useAuth();
  const [data, setData] = useState([]);
  console.log(user);

  useEffect(() => {
    if (!user) return;

    AxiosPublic.get(`/blogs?email=${user.email}`)
      .then((res) => setData(res.data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]); 

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {data && <p>{data.length}</p>}
    </div>
  );
};

export default ManagePosts;
