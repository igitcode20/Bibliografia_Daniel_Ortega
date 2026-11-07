import React, { useState, useEffect } from 'react';
import { IoPlay } from 'react-icons/io5';
import api from '../api/axios';
import Modal from './Modal';

const realVideos = [
  {
    _id: '1',
    title: 'Discurso en la Asamblea General de la ONU 2007',
    category: 'discurso',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/assets/ortega-2014.jpg',
    duration: '32:45',
    date: 'Septiembre 2007',
    description: 'Histórica intervención del Presidente Daniel Ortega ante las Naciones Unidas en defensa del orden internacional justo.'
  },
  {
    _id: '2',
    title: 'Discurso 40 Aniversario de la Revolución Sandinista',
    category: 'discurso',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/assets/daniel-ortega.jpg',
    duration: '48:10',
    date: '19 de Julio 2019',
    description: 'Mensaje conmemorativo en la Plaza de la Fe ante miles de familias nicaragüenses y delegaciones internacionales.'
  },
  {
    _id: '3',
    title: 'Entrevista Exclusiva en TeleSUR 2018',
    category: 'entrevista',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/assets/ortega-lula-2010.jpg',
    duration: '54:20',
    date: 'Julio 2018',
    description: 'Entrevista sobre la soberanía, la estabilidad nacional y el bienestar de las familias nicaragüenses.'
  }
];

const Videos = ({ preview = false }) => {
  const [videos, setVideos] = useState(realVideos);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get('/videos');
        if (res.data && res.data.length > 0) {
          setVideos(res.data);
        }
      } catch (err) {
        // Mantiene realVideos
      }
    };
    fetchVideos();
  }, []);

  const categories = ['Todos', 'Discursos', 'Entrevistas', 'Eventos', 'Documentales'];

  const filteredVideos = selectedCategory === 'Todos'
    ? videos
    : videos.filter((v) => v.category?.toLowerCase() === selectedCategory.toLowerCase().slice(0, -1) || v.category?.toLowerCase() === selectedCategory.toLowerCase());

  const displayVideos = preview ? filteredVideos.slice(0, 3) : filteredVideos;

  return (
    <section className="section section--alt" id="videos">
      <div className="section__header">
        <h2 className="section__title">DISCURSOS Y VIDEOS</h2>
      </div>

      <div className="filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-tabs__btn ${selectedCategory === cat ? 'filter-tabs__btn--active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="videos__grid">
        {displayVideos.map((video) => (
          <div
            key={video._id || video.title}
            className="video-card"
            onClick={() => setActiveVideo(video)}
          >
            <div className="video-card__thumbnail">
              <img
                src={video.thumbnailUrl || '/assets/daniel-ortega.jpg'}
                alt={video.title}
              />
              <div className="video-card__play">
                <IoPlay />
              </div>
            </div>

            <div className="video-card__body">
              <h4 className="video-card__title">{video.title}</h4>
              <div className="video-card__meta">
                <span className="card__badge">{video.category || 'Discurso'}</span>
                <span>{video.date}</span>
                {video.duration && <span>• {video.duration}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title || 'Reproductor de Video'}
        maxWidth="800px"
      >
        {activeVideo && (
          <div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', background: '#000' }}>
              <iframe
                title={activeVideo.title}
                src={activeVideo.videoUrl}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={{ marginTop: '16px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                {activeVideo.description}
              </p>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '8px' }}>
                Fecha: {activeVideo.date} | Categoría: {activeVideo.category}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Videos;
