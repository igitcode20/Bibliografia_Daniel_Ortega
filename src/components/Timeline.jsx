import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Modal from './Modal';

const realEvents = [
  {
    _id: '1',
    year: 1945,
    title: 'Nacimiento en La Libertad, Chontales',
    description: 'José Daniel Ortega Saavedra nace el 11 de noviembre de 1945 en el seno de una familia de firmes valores patrióticos y antiimperialistas.',
    imageUrl: '/assets/daniel-ortega.jpg',
    category: 'personal',
    detailedContent: 'José Daniel Ortega Saavedra nació el 11 de noviembre de 1945 en el municipio minero de La Libertad, Chontales. Creció en un ambiente familiar signado por la dignidad, la laboriosidad y un profundo patriotismo. Su padre, Daniel Ortega Cerda, combatió en su juventud junto a las tropas liberales y guardó siempre una profunda admiración por el General Augusto C. Sandino.',
    sources: ['Archivo General de la Nación de Nicaragua', 'Registro Histórico de Chontales']
  },
  {
    _id: '2',
    year: 1963,
    title: 'Inicio del Activismo Revolucionario',
    description: 'A los 18 años se integra formalmente al Frente Sandinista de Liberación Nacional (FSLN) en la lucha clandestina contra la dictadura somocista.',
    imageUrl: '/assets/ortega-lula-2010.jpg',
    category: 'politico',
    detailedContent: 'En 1963 Daniel Ortega se une a la resistencia armada y política clandestina del FSLN. Asumió tareas de propaganda y organización popular. En 1967 fue encarcelado en la cárcel La Modelo donde pasó siete años sin claudicar en sus ideales revolucionarios.',
    sources: ['Documentos Históricos del FSLN']
  },
  {
    _id: '3',
    year: 1979,
    title: 'Triunfo de la Revolución Popular Sandinista',
    description: 'El 19 de julio de 1979 se proclama la victoria popular que derroca a la dictadura militar. Daniel Ortega es nombrado Coordinador de la Junta de Gobierno.',
    imageUrl: '/assets/ortega-2014.jpg',
    category: 'politico',
    detailedContent: 'Entrada triunfal de las columnas guerrilleras a Managua el 19 de julio de 1979. Daniel Ortega es nombrado Coordinador de la Junta de Gobierno de Reconstrucción Nacional, encabezando la Cruzada Nacional de Alfabetización y las transformaciones sociales.',
    sources: ['Diario Barricada, Edición de la Victoria', 'Gaceta Oficial de 1979']
  },
  {
    _id: '4',
    year: 1984,
    title: 'Elecciones Generales y Primera Presidencia',
    description: 'Con el 67% de los votos en elecciones libres, resulta electo Presidente Constitucional de Nicaragua para el período 1985-1990.',
    imageUrl: '/assets/ortega-2014.jpg',
    category: 'politico',
    detailedContent: 'En noviembre de 1984 se celebraron elecciones generales libres con observación internacional, resultando electo Daniel Ortega. Durante su mandato se promulgó la Constitución Política de 1987 y se firmaron los Acuerdos de Paz de Esquipulas II.',
    sources: ['Consejo Supremo Electoral de Nicaragua', 'Acuerdos de Esquipulas II']
  },
  {
    _id: '5',
    year: 2007,
    title: 'Retorno a la Presidencia de la República',
    description: 'Inicia la segunda etapa de la Revolución con programas de salud y educación 100% gratuitas, infraestructura y restitución de derechos.',
    imageUrl: '/assets/ortega-2024.jpg',
    category: 'politico',
    detailedContent: 'El 10 de enero de 2007, Daniel Ortega asume la Presidencia de la República. De inmediato decreta la gratuidad de la salud y la educación e implementa los programas sociales Hambre Cero, Usura Cero y Merienda Escolar.',
    sources: ['Decretos Ejecutivos de Enero 2007']
  }
];

const Timeline = ({ preview = false }) => {
  const [events, setEvents] = useState(realEvents);
  const [activeDecade, setActiveDecade] = useState('Todas');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/timeline');
        if (res.data && res.data.length > 0) {
          setEvents(res.data);
        }
      } catch (err) {
        // Mantiene realEvents
      }
    };
    fetchEvents();
  }, []);

  const decades = [
    { label: 'Todas', value: 'Todas' },
    { label: '1945', value: 1945 },
    { label: '1960', value: 1960 },
    { label: '1970', value: 1970 },
    { label: '1980', value: 1980 },
    { label: '1990', value: 1990 },
    { label: '2000', value: 2000 },
    { label: '2010', value: 2010 },
    { label: '2020', value: 2020 },
    { label: 'HOY', value: 'HOY' }
  ];

  const filteredEvents = activeDecade === 'Todas'
    ? events
    : events.filter((ev) => {
        if (typeof activeDecade === 'number') {
          return Math.abs(ev.year - activeDecade) <= 5;
        }
        return true;
      });

  const displayEvents = preview ? filteredEvents.slice(0, 4) : filteredEvents;

  return (
    <section className="section" id="linea-de-tiempo">
      <div className="section__header">
        <h2 className="section__title">LÍNEA DE TIEMPO INTERACTIVA</h2>
      </div>

      <div className="timeline">
        {/* Barra superior horizontal con décadas */}
        <div className="timeline__bar">
          <div className="timeline__line" />
          {decades.map((dec, idx) => (
            <div
              key={idx}
              className={`timeline__decade ${activeDecade === dec.value ? 'timeline__decade--active' : ''}`}
              onClick={() => setActiveDecade(dec.value)}
            >
              <div className="timeline__decade-dot" />
              <div className="timeline__decade-label">{dec.label}</div>
            </div>
          ))}
        </div>

        {/* Tarjetas de eventos */}
        <div className="timeline__events">
          {displayEvents.map((ev) => (
            <div key={ev._id || ev.year} className="timeline-event-card">
              <div className="timeline-event-card__image">
                <img
                  src={ev.imageUrl || '/assets/daniel-ortega.jpg'}
                  alt={ev.title}
                />
                <span className="timeline-event-card__year">{ev.year}</span>
              </div>
              <div className="timeline-event-card__body">
                <h4 className="timeline-event-card__title">{ev.title}</h4>
                <p className="timeline-event-card__desc">{ev.description}</p>
                <button
                  type="button"
                  className="timeline-event-card__btn"
                  onClick={() => setSelectedEvent(ev)}
                >
                  VER MÁS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalle */}
      <Modal
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent ? `${selectedEvent.year} - ${selectedEvent.title}` : ''}
        maxWidth="700px"
      >
        {selectedEvent && (
          <div>
            <img
              src={selectedEvent.imageUrl || '/assets/daniel-ortega.jpg'}
              alt={selectedEvent.title}
              style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
            />
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '14.5px' }}>
              {selectedEvent.detailedContent || selectedEvent.description}
            </p>
            {selectedEvent.sources && selectedEvent.sources.length > 0 && (
              <div style={{ marginTop: '16px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--accent-gold)', fontSize: '12px', textTransform: 'uppercase' }}>
                  Fuentes consultadas:
                </strong>
                <ul style={{ margin: '6px 0 0 16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  {selectedEvent.sources.map((s, idx) => <li key={idx}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Timeline;
