import React from 'react';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

const MapPage = () => {
  return (
    <div style={{ paddingTop: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <MapSection />
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
