import { useState } from "react";
import AxiosPublic from "../../Axios/AxiosBase";

const Announcement = () => {
  const [announcementText, setAnnouncementText] = useState('');

  const handleInputChange = (event) => {
    setAnnouncementText(event.target.value);
  };

  const submitAnnouncement = () => {
    const notice={notice:announcementText}
    AxiosPublic.post('notice',notice)
    .then(res=>console.log(res.data))
  };



  return (
      <div className="w-full ml-10">
        <h1 className="mb-4 text-2xl font-bold">Announcement</h1>

        <textarea
          className="w-full h-32 mb-4 p-2 border rounded-md"
          placeholder="Type your announcement here..."
          value={announcementText}
          onChange={handleInputChange}
        />

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          onClick={submitAnnouncement}
        >
          Submit Announcement
        </button>
      </div>
  );
};

export default Announcement;