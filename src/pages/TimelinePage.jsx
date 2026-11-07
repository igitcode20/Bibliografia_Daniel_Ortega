import React from 'react';
import Timeline from '../components/Timeline';
import Footer from '../components/Footer';

const TimelinePage = () => {
  return (
    <div style={{ paddingTop: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Timeline preview={false} />
      </div>
      <Footer />
    </div>
  );
};

export default TimelinePage;
