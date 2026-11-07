import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from './Modal';

const realPhotos = [
  {
    _id: '1',
    title: 'Comandante Daniel Ortega Saavedra',
    decade: '2020s',
    imageUrl: '/assets/daniel-ortega.jpg',
    description: 'Fotografía oficial del Presidente de la República de Nicaragua.'
  },
  {
    _id: '2',
    title: 'Daniel Ortega en la Cumbre Presidencial CELAC',
    decade: '2010s',
    imageUrl: '/assets/ortega-2014.jpg',
    description: 'Participación en foros internacionales de integración regional y soberanía.'
  },
  {
    _id: '3',
    title: 'Encuentro de Cooperación y Fraternidad Sur-Sur',
    decade: '2010s',
    imageUrl: '/assets/ortega-lula-2010.jpg',
    description: 'Reunión bilateral fortaleciendo los lazos de cooperación productiva y solidaridad.'
  },
  {
    _id: '4',
    title: 'Acto Central del 45 Aniversario de la Revolución (2024)',
    decade: '2020s',
    imageUrl: '/assets/ortega-2024.jpg',
    description: 'Conmemoración en la Plaza de la Revolución junto al pueblo nicaragüense.'
  }
];

const Gallery = ({ preview = false }) => {
  const [photos, setPhotos] = useState(realPhotos);
  const [selectedDecade, setSelectedDecade] = useState('Todas');
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get('/gallery');
        if (res.data && res.data.length > 0) {
          setPhotos(res.data);
        }
      } catch (err) {
        // Mantiene realPhotos
      }
    };
    fetchPhotos();
  }, []);

  const decades = ['Todas', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

  const filteredPhotos = selectedDecade === 'Todas'
    ? photos
    : photos.filter((p) => p.decade === selectedDecade);

  const displayPhotos = preview ? filteredPhotos.slice(0, 4) : filteredPhotos;

  return (
    <section className="section" id="galeria">
      <div className="section__header">
        <h2 className="section__title">GALERÍA FOTOGRÁFICA</h2>
      </div>

      <div className="filter-tabs">
        {decades.map((dec) => (
          <button
            key={dec}
            type="button"
            className={`filter-tabs__btn ${selectedDecade === dec ? 'filter-tabs__btn--active' : ''}`}
            onClick={() => setSelectedDecade(dec)}
          >
            {dec}
          </button>
        ))}
      </div>

      <div className="gallery__grid">
        {displayPhotos.map((photo) => (
          <div
            key={photo._id || photo.title}
            className="gallery-card"
            onClick={() => setActivePhoto(photo)}
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="gallery-card__image"
            />
            <div className="gallery-card__overlay">
              <h5 className="gallery-card__title">{photo.title}</h5>
              <p className="gallery-card__desc">{photo.decade}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={Boolean(activePhoto)}
        onClose={() => setActivePhoto(null)}
        title={activePhoto?.title || 'Fotografía Histórica'}
        maxWidth="800px"
      >
        {activePhoto && (
          <div>
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.title}
              style={{ width: '100%', maxHeight: '450px', objectFit: 'contain', borderRadius: '8px', background: '#000' }}
            />
            <div style={{ marginTop: '16px' }}>
              <span className="card__badge">{activePhoto.decade}</span>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                {activePhoto.description || activePhoto.title}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Gallery;
