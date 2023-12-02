import  { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ZoomIn = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const zoomInRef = useRef();

  const handleIntersection = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

    observer.observe(zoomInRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={zoomInRef}
      className={`transition-transform duration-1000 ease-in-out transform scale-0 ${isVisible ? 'scale-100' : ''}`}
    >
      {children}
    </div>
  );
};

ZoomIn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ZoomIn;
