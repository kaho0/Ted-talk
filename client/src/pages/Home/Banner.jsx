
const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen "
      style={{ backgroundImage: "url('https://i.ibb.co/4ZLjHqS/top-view-workspace-with-laptop-notebook.jpg')" }}
    >
      {/* Overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Text content */}
      <div className="absolute inset-0 flex items-center justify-start p-8">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold">TagTalk</h1>
          <p className="text-lg md:text-xl mt-5">Your platform for meaningful discussions and engaging blog posts.</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
