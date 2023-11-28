import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import AxiosPublic from '../../../Axios/AxiosBase';

const Interactions = () => {
  const { user, loading } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ['cart'],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/blogs?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const postsWithComments = data?.filter((post) => post.comments.length > 0);

  return (
    <div className='grid grid-cols-2 gap-2'>
      {postsWithComments?.length > 0 ? (
        postsWithComments.map((post) => (
          <div key={post._id} className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden mb-8 ml-2">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>

              <div className="mt-4">
                {post.comments.map((comment) => (
                  <div key={comment._id} className="mb-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">{comment.email}:</span> {comment.comment}
                    </p>
                  </div>
                ))}
              </div>

              <button className="mt-4 text-red-500 font-semibold focus:outline-none">
                Report
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No comments to show.</p>
      )}
    </div>
  );
};

export default Interactions;
