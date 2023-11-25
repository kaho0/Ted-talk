import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="text-center p-4 text-gray-600">
      <h1 className="text-4xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
