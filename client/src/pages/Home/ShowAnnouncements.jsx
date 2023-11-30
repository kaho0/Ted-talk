import { useEffect, useState } from "react";
import AxiosPublic from "../../Axios/AxiosBase";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ShowAnnouncements = () => {

   const [posts, setposts] = useState([])

    useEffect(() => {
        AxiosPublic.get('getnotice')
            .then(res => {
                setposts(res.data)
            })


    }, [])

    return (
           <Swiper

      
spaceBetween={50}

      
slidesPerView={3}

      
onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {posts.map((post) => (
        <SwiperSlide key={post._id}>
          <p>{post.notice}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ShowAnnouncements;