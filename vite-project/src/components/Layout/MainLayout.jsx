import React from 'react';
import EarthVideoBackground from '../Earth/EarthVedioBackground';
import NavBar from '../NavBar';
import Footer from '../Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <EarthVideoBackground />
      <NavBar />
      
      <div style={pageContainerStyle}>
        <main style={mainContentStyle}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

const pageContainerStyle = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainContentStyle = {
  flex: 1,
  paddingTop: '80px', // adjust according to actual navbar height
};

export default MainLayout;
