import { useState } from "react";
import AxiosPublic from "../../Axios/AxiosBase";

const Announcement = () => {
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const handleTitleChange = (event) => {
    setAnnouncementTitle(event.target.value);
  };

  const handleInputChange = (event) => {
    setAnnouncementText(event.target.value);
  };

  const handleTimeChange = () => {
    const now = new Date();
    const formattedTime = `${now.getHours()}:${now.getMinutes()}`;
    setCurrentTime(formattedTime);
  };

  const submitAnnouncement = () => {
    const announcementData = {
      title: announcementTitle,
      notice: announcementText,
      time: currentTime,
    };

    AxiosPublic.post('notice', announcementData)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error("Error submitting announcement:", error);
      });
  };

  return (
    <div className="w-full ml-10">
      <h1 className="mb-4 text-2xl font-bold">Announcement</h1>

      <input
        type="text"
        className="w-full mb-4 p-2 border rounded-md"
        placeholder="Title"
        value={announcementTitle}
        onChange={handleTitleChange}
      />

      <textarea
        className="w-full h-32 mb-4 p-2 border rounded-md"
        placeholder="Type your announcement here..."
        value={announcementText}
        onChange={handleInputChange}
      />

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        onClick={() => {
          handleTimeChange();
          submitAnnouncement();
        }}
      >
        Submit Announcement
      </button>
    </div>
  );
};

export default Announcement;
