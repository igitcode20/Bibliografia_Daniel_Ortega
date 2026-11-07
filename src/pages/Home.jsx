import React from 'react';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import MapSection from '../components/MapSection';
import AIAssistant from '../components/AIAssistant';
import Gallery from '../components/Gallery';
import Videos from '../components/Videos';
import Documents from '../components/Documents';
import OfflineSection from '../components/OfflineSection';
import Footer from '../components/Footer';

const Home = () => {
  const handleHeroSearch = (query) => {
    if (!query) return;
    const lower = query.toLowerCase();
    if (lower.includes('tiempo') || lower.includes('año') || lower.includes('19')) {
      document.getElementById('linea-de-tiempo')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lower.includes('mapa') || lower.includes('managua') || lower.includes('chontales')) {
      document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lower.includes('foto') || lower.includes('galeria') || lower.includes('imagen')) {
      document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lower.includes('video') || lower.includes('discurso') || lower.includes('entrevista')) {
      document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('documentos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page" style={{ width: '100%', overflowX: 'hidden' }}>
      <Hero onSearch={handleHeroSearch} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 16px' }}>
        {/* Línea de tiempo interactiva */}
        <Timeline preview={true} />

        {/* Sección de Mapa interactivo junto con el Asistente IA */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '24px',
          margin: '30px 0'
        }}>
          <div style={{ width: '100%', minWidth: 0 }}>
            <MapSection />
          </div>
          <div style={{ width: '100%', minWidth: 0 }}>
            <AIAssistant />
          </div>
        </div>

        {/* Galería Fotográfica */}
        <Gallery preview={true} />

        {/* Discursos y Videos */}
        <Videos preview={true} />

        {/* Biblioteca Documental */}
        <Documents preview={true} />

        {/* Sección Funciona sin Conexión y Características PWA */}
        <OfflineSection />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
