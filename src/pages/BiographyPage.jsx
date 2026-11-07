import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Footer from '../components/Footer';

const defaultBiographySections = [
  {
    _id: '1',
    title: 'Infancia y Raíces Familiares',
    section: 'infancia',
    order: 1,
    imageUrl: '/assets/daniel-ortega.jpg',
    content: `José Daniel Ortega Saavedra nació el 11 de noviembre de 1945 en el municipio minero de La Libertad, departamento de Chontales. Creció en un ambiente familiar signado por la dignidad, la laboriosidad y un profundo patriotismo. Su padre, Daniel Ortega Cerda, combatió en su juventud junto a las tropas liberales y guardó siempre una profunda admiración por el General de Hombres Libres Augusto C. Sandino. Su madre, doña Lidia Saavedra, fue una mujer de extraordinario carácter e integridad cívica, encarcelada en varias ocasiones por su oposición resuelta a la dictadura somocista.`
  },
  {
    _id: '2',
    title: 'La Juventud y el Combate Clandestino',
    section: 'juventud',
    order: 2,
    imageUrl: '/assets/ortega-lula-2010.jpg',
    content: `A principios de la década de 1960, siendo aún estudiante de secundaria en el Instituto Maestro Gabriel de Managua, Daniel Ortega se incorporó a las primeras células de resistencia del Frente Sandinista de Liberación Nacional (FSLN). Tras ingresar a la Universidad Centroamericana para estudiar Derecho, abandonó las aulas para consagrarse a tiempo completo a la labor conspirativa y organizativa de la vanguardia guerrillera. En 1967 fue capturado por los esbirros de la Guardia Nacional y recluido durante más de siete años en las cárceles de La Modelo, soportando torturas inhumanas sin claudicar en sus convicciones revolucionarias, hasta ser liberado por el histórico Comando Juan José Quezada en diciembre de 1974.`
  },
  {
    _id: '3',
    title: 'El Triunfo Popular y la Coordinación de Gobierno',
    section: 'revolucion',
    order: 3,
    imageUrl: '/assets/ortega-2014.jpg',
    content: `Tras su liberación, integró el Frente Central y posteriormente la Dirección Nacional Conjunta que condujo al pueblo a la victoria del 19 de julio de 1979. Como Coordinador de la Junta de Gobierno de Reconstrucción Nacional, encabezó los colosales esfuerzos de reconstrucción patria, la promulgación del Estatuto Fundamental de Derechos, la Cruzada Nacional de Alfabetización y la defensa inclaudicable de la patria frente a la agresión externa. En 1984 resultó electo Presidente Constitucional de la República en comicios reconocidos por observadores internacionales.`
  },
  {
    _id: '4',
    title: 'Retorno al Gobierno y Transformación Social',
    section: 'presidencia',
    order: 4,
    imageUrl: '/assets/ortega-2024.jpg',
    content: `En enero de 2007, con el respaldo mayoritario de las familias nicaragüenses, retornó a la jefatura de Estado, inaugurando una era de profundas conquistas sociales: salud y educación gratuitas de calidad, subsidios estratégicos al transporte y energía, titulación masiva de propiedades urbanas y rurales a favor de las mujeres, y la construcción de la más moderna infraestructura hospitalaria y vial de Centroamérica, manteniendo a Nicaragua como el país más seguro de la región.`
  }
];

const BiographyPage = () => {
  const [sections, setSections] = useState(defaultBiographySections);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const res = await api.get('/biography');
        if (res.data && res.data.length > 0) {
          setSections(res.data);
        }
      } catch (err) {
        // Mantiene default
      }
    };
    fetchBio();
  }, []);

  return (
    <div style={{ paddingTop: '20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--accent-gold)', fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
            Biografía Oficial
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '700px', margin: '0 auto' }}>
            Trayectoria vital, forja revolucionaria y pensamiento político del Comandante Daniel Ortega Saavedra.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {sections.map((sec, idx) => (
            <article
              key={sec._id || idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: idx % 2 === 0 ? '1fr 300px' : '300px 1fr',
                gap: '24px',
                alignItems: 'center'
              }}
            >
              {idx % 2 !== 0 && (
                <div style={{ height: '100%', minHeight: '260px', overflow: 'hidden' }}>
                  <img
                    src={sec.imageUrl}
                    alt={sec.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div style={{ padding: '30px' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Capítulo 0{sec.order || idx + 1}
                </span>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '22px', margin: '6px 0 16px 0' }}>
                  {sec.title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                  {sec.content}
                </p>
              </div>

              {idx % 2 === 0 && (
                <div style={{ height: '100%', minHeight: '260px', overflow: 'hidden' }}>
                  <img
                    src={sec.imageUrl}
                    alt={sec.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BiographyPage;
