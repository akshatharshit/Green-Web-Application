import React from 'react';
import earth from '../../assets/earth.mp4'; // Path to your video

const EarthVideoBackground = () => {
  return (
    <div style={videoContainerStyle}>
      <video style={backgroundVideoStyle} autoPlay loop muted>
        <source src={earth} type="video/mp4" />
      </video>
    </div>
  );
};

const videoContainerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1, // Video stays behind other components
};

const backgroundVideoStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
};

export default EarthVideoBackground;
