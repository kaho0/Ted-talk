/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import './SlideInFromLeft.css'; 

const SlideInFromLeft = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transform transition-transform duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

export default SlideInFromLeft;
