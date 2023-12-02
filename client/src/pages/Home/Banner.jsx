import { TypeAnimation } from 'react-type-animation';

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen "
      style={{ backgroundImage: "url('https://i.ibb.co/4ZLjHqS/top-view-workspace-with-laptop-notebook.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="absolute inset-0 flex items-center justify-start p-8">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold">TagTalk</h1>
          <TypeAnimation
            sequence={[
              'Your platform',
              1000,
              'for meaningful discussions and engaging blog posts.',

            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block' }}
            repeat={Infinity}
          />

        </div>
      </div>
    </div>
  );
};

export default Banner;
