import React from 'react';
import {
  IoShieldCheckmarkOutline,
  IoPeopleOutline,
  IoBookOutline,
  IoFlagOutline
} from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Frase y firma */}
        <div className="footer__quote">
          <div className="footer__quote-text">
            "Aquí no nos rendimos, aquí no nos vendemos, ¡aquí estamos y aquí seguiremos!"
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
            <img
              src="/assets/daniel-ortega-signature.svg"
              alt="Firma Daniel Ortega"
              style={{
                height: '32px',
                filter: 'invert(75%) sepia(50%) saturate(600%) hue-rotate(5deg)'
              }}
            />
            <span className="footer__quote-author">Daniel Ortega Saavedra</span>
          </div>
        </div>

        {/* Logo central con laureles */}
        <div className="footer__center">
          <div style={{ fontSize: '24px', color: 'var(--accent-gold)', marginBottom: '4px' }}>
            🌿 🏛️ 🌿
          </div>
          <div className="footer__center-logo">
            DANIEL ORTEGA SAAVEDRA
          </div>
          <div className="footer__center-subtitle">
            ARCHIVO BIOGRÁFICO DIGITAL<br />MEMORIA, HISTORIA Y LEGADO
          </div>
        </div>
      </div>

      {/* 4 Valores */}
      <div className="footer__values">
        <div className="footer__value">
          <div className="footer__value-icon"><IoShieldCheckmarkOutline /></div>
          <div>Verdad Histórica Documentada</div>
        </div>
        <div className="footer__value">
          <div className="footer__value-icon"><IoPeopleOutline /></div>
          <div>Memoria del Pueblo Nicaragüense</div>
        </div>
        <div className="footer__value">
          <div className="footer__value-icon"><IoBookOutline /></div>
          <div>Legado para las Futuras Generaciones</div>
        </div>
        <div className="footer__value">
          <div className="footer__value-icon"><IoFlagOutline /></div>
          <div>Patria, Paz, Soberanía y Dignidad</div>
        </div>
      </div>

      {/* Franja de créditos */}
      <div className="footer__bottom">
        <div>© 2024 Archivo Biográfico Digital de Daniel Ortega Saavedra - Todos los derechos reservados.</div>
        <div className="footer__bottom-tech">Desarrollado con tecnología PWA • Hecho en Nicaragua 🇳🇮</div>
      </div>
    </footer>
  );
};

export default Footer;
