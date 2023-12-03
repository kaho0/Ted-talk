/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './SlideInFromRight.css'; 

const SlideInFromRight = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transform transition-transform duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

export default SlideInFromRight;
