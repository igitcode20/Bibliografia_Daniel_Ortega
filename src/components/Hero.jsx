import React, { useState } from 'react';
import { IoSparkles } from 'react-icons/io5';
import StatsCounter from './StatsCounter';

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const stats = [
    { target: 80, suffix: '+', label: 'Años de Historia' },
    { target: 1500, suffix: '+', label: 'Fotografías' },
    { target: 500, suffix: '+', label: 'Documentos' },
    { target: 300, suffix: '+', label: 'Videos' },
    { target: 200, suffix: '+', label: 'Discursos' },
  ];

  return (
    <section className="hero" id="inicio">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__welcome">BIENVENIDO AL</div>
          <h1 className="hero__title">ARCHIVO BIOGRÁFICO DIGITAL</h1>
          <div className="hero__subtitle">DE DANIEL ORTEGA SAAVEDRA</div>

          <p className="hero__description">
            Un espacio para conocer la vida, trayectoria, pensamiento y legado histórico
            del Comandante Daniel Ortega Saavedra, a través de documentos, imágenes, videos y testimonios.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div className="hero__signature" style={{ margin: 0 }}>
              Patria Libre o Morir
            </div>
            <img
              src="/assets/daniel-ortega-signature.svg"
              alt="Firma Daniel Ortega Saavedra"
              style={{
                height: '36px',
                filter: 'invert(75%) sepia(50%) saturate(600%) hue-rotate(5deg)',
                opacity: 0.95
              }}
            />
          </div>

          <div className="hero__stats">
            {stats.map((stat, idx) => (
              <div key={idx} className="hero__stat">
                <div className="hero__stat-number">
                  <StatsCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="hero__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div id="buscador">
            <form onSubmit={handleSearchSubmit} className="hero__search">
              <input
                type="text"
                className="hero__search-input"
                placeholder="Buscar acontecimientos, documentos, discursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="hero__search-btn">
                <IoSparkles style={{ marginRight: '6px' }} /> BUSCADOR INTELIGENTE
              </button>
            </form>
          </div>
        </div>

        <div className="hero__image">
          <img
            src="/assets/daniel-ortega.jpg"
            alt="Comandante Daniel Ortega Saavedra"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(180deg, transparent 0%, rgba(26, 10, 10, 0.95) 60%)',
            padding: '20px 16px 14px',
            zIndex: 2
          }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px' }}>
              CMDTE. DANIEL ORTEGA SAAVEDRA
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '2px' }}>
              Líder de la Revolución y Presidente de Nicaragua
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
