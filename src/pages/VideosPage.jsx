import React from 'react';
import Videos from '../components/Videos';
import Footer from '../components/Footer';

const VideosPage = () => {
  return (
    <div style={{ paddingTop: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Videos preview={false} />
      </div>
      <Footer />
    </div>
  );
};

export default VideosPage;
