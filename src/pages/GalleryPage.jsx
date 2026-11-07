import React from 'react';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

const GalleryPage = () => {
  return (
    <div style={{ paddingTop: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Gallery preview={false} />
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
