import React from 'react';

const GradientText = ({ children, className = '' }) => {
  const gradientStyle = {
    background: 'linear-gradient(135deg, #ff0000ff 25%, #ac2020ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block'
  };

  return (
    <span style={gradientStyle} className={className}>
      {children}
    </span>
  );
};

export default GradientText;
