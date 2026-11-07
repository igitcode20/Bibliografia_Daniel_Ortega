import React from 'react';
import Documents from '../components/Documents';
import Footer from '../components/Footer';

const DocumentsPage = () => {
  return (
    <div style={{ paddingTop: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Documents preview={false} />
      </div>
      <Footer />
    </div>
  );
};

export default DocumentsPage;
