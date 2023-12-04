/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
const SlideInFromLeft = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      style={{
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
        transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default SlideInFromLeft;
