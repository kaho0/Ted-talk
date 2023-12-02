import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

import AxiosPublic from "../../Axios/AxiosBase";

export default function App() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    AxiosPublic.get('getnotice')
      .then(res => {
        setAnnouncements(res.data);
      })
      .catch(error => {
        console.error("Error fetching announcements:", error);
      });
  }, []);

  return (
    <div>

      <div className="">
        <h1 className="mb-4 text-4xl font-bold text-center">Important Announcements</h1>

      </div>


      <Swiper navigation={true} modules={[Navigation]} className="mySwiper h-[300px]">
        {announcements.map((announcement, index) => (
          <SwiperSlide key={index} className="bg-white p-4 ml-3 mr-2 rounded shadow-md ">
            <h2 className="text-2xl font-bold mb-2">{announcement.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{announcement.time}</p>
            <p className="text-gray-800">{announcement.notice}</p>
          </SwiperSlide>
        ))}
      </Swiper>





    </div>

  );
}

