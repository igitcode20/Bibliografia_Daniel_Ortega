import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import api from '../api/axios';
import Modal from './Modal';

// Configurar icono de pin con estilo maroon/dorado
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultLocations = [
  {
    _id: '1',
    name: 'Managua',
    category: 'historico',
    latitude: 12.1364,
    longitude: -86.2514,
    description: 'Lugar de múltiples acontecimientos importantes en la historia política y social de Nicaragua.',
    details: 'Capital política de la nación, escenario de la toma del Palacio Nacional en 1978, la entrada triunfal del 19 de julio de 1979 y sede de las decisiones gubernamentales de la Revolución.',
    year: 1979
  },
  {
    _id: '2',
    name: 'La Libertad, Chontales',
    category: 'personal',
    latitude: 12.2167,
    longitude: -85.1667,
    description: 'Cuna natal del Comandante Daniel Ortega Saavedra.',
    details: 'Municipio minero y ganadero donde nació el 11 de noviembre de 1945. Lugar que forjó las primeras memorias familiares y el sentido de identidad popular nicaragüense.',
    year: 1945
  },
  {
    _id: '3',
    name: 'León',
    category: 'historico',
    latitude: 12.4379,
    longitude: -86.8780,
    description: 'Primera capital de la Revolución y bastión histórico de la lucha popular.',
    details: 'Ciudad universitaria y heroica donde se consolidaron los frentes guerrilleros y se instaló la primera sede de la Junta de Gobierno de Reconstrucción Nacional en 1979.',
    year: 1979
  },
  {
    _id: '4',
    name: 'Matagalpa',
    category: 'historico',
    latitude: 12.9256,
    longitude: -85.9178,
    description: 'Tierras heroicas del Frente Norte Carlos Fonseca Amador.',
    details: 'Zona montañosa estratégica para la insurrección campesina y la defensa armada durante las etapas formativas de la guerrilla sandinista.',
    year: 1978
  },
  {
    _id: '5',
    name: 'Estelí',
    category: 'historico',
    latitude: 13.0919,
    longitude: -86.3538,
    description: 'La tres veces heroica ciudad de Estelí.',
    details: 'Escenario de tres insurrecciones populares decisivas antes del triunfo definitivo de julio de 1979.',
    year: 1979
  }
];

const MapSection = () => {
  const [locations, setLocations] = useState(defaultLocations);
  const [selectedLoc, setSelectedLoc] = useState(defaultLocations[0]);
  const [modalLoc, setModalLoc] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get('/map-locations');
        if (res.data && res.data.length > 0) {
          setLocations(res.data);
          setSelectedLoc(res.data[0]);
        }
      } catch (err) {
        // Mantiene defaultLocations
      }
    };
    fetchLocations();
  }, []);

  return (
    <section className="section section--alt" id="mapa">
      <div className="section__header">
        <h2 className="section__title">MAPA HISTÓRICO INTERACTIVO</h2>
      </div>

      <div style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        height: '520px',
        background: '#e5e3df'
      }}>
        <MapContainer
          center={[12.8654, -85.2072]}
          zoom={7.5}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((loc) => (
            <Marker
              key={loc._id || loc.name}
              position={[loc.latitude, loc.longitude]}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  setSelectedLoc(loc);
                }
              }}
            >
              <Popup>
                <div style={{ color: '#1a0a0a', padding: '4px' }}>
                  <strong>{loc.name}</strong>
                  <p style={{ margin: '4px 0', fontSize: '12px' }}>{loc.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Tarjeta flotante como en la imagen */}
        {selectedLoc && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '15px',
            right: '15px',
            maxWidth: '320px',
            background: 'rgba(26, 10, 10, 0.94)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '16px',
            zIndex: 1000,
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--accent-gold)'
              }} />
              <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '16px', fontWeight: '700' }}>
                {selectedLoc.name}
              </h4>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Acontecimiento Histórico {selectedLoc.year ? `(${selectedLoc.year})` : ''}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5', margin: '0 0 14px 0' }}>
              {selectedLoc.description}
            </p>

            <button
              type="button"
              className="btn btn--gold"
              style={{ fontSize: '11px', padding: '6px 14px' }}
              onClick={() => setModalLoc(selectedLoc)}
            >
              VER DETALLES
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={Boolean(modalLoc)}
        onClose={() => setModalLoc(null)}
        title={modalLoc ? `Lugar Histórico: ${modalLoc.name}` : ''}
      >
        {modalLoc && (
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
              {modalLoc.details || modalLoc.description}
            </p>
            <div style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
              <div><strong>Coordenadas:</strong> {modalLoc.latitude.toFixed(4)}, {modalLoc.longitude.toFixed(4)}</div>
              {modalLoc.year && <div><strong>Año destacado:</strong> {modalLoc.year}</div>}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default MapSection;
