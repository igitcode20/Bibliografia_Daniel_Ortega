import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  IoHomeOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoImagesOutline,
  IoVideocamOutline,
  IoDocumentTextOutline,
  IoMapOutline,
  IoBookOutline,
  IoSearchOutline,
  IoGitCompareOutline,
  IoStarOutline,
  IoSettingsOutline,
  IoCloudDownloadOutline,
  IoLogOutOutline,
  IoLogInOutline
} from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [offlineMode, setOfflineMode] = useState(false);

  const toggleOffline = () => {
    const nextState = !offlineMode;
    setOfflineMode(nextState);
    if (nextState) {
      toast.success('Modo sin conexión activado. Datos sincronizados localmente.');
    } else {
      toast.info('Modo sin conexión desactivado.');
    }
  };

  const navLinks = [
    { to: '/', label: 'Inicio', icon: <IoHomeOutline /> },
    { to: '/biografia', label: 'Biografía', icon: <IoPersonOutline /> },
    { to: '/linea-de-tiempo', label: 'Línea de Tiempo', icon: <IoCalendarOutline /> },
    { to: '/galeria', label: 'Galería Histórica', icon: <IoImagesOutline /> },
    { to: '/videos', label: 'Discursos y Videos', icon: <IoVideocamOutline /> },
    { to: '/documentos', label: 'Documentos', icon: <IoDocumentTextOutline /> },
    { to: '/mapa', label: 'Mapa Histórico', icon: <IoMapOutline /> },
    { to: '/contexto', label: 'Contexto Histórico', icon: <IoBookOutline /> },
    { to: '/#buscador', label: 'Buscador Inteligente', icon: <IoSearchOutline /> },
    { to: '/comparador', label: 'Comparador Histórico', icon: <IoGitCompareOutline /> },
    { to: '/favoritos', label: 'Favoritos', icon: <IoStarOutline /> },
  ];

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`} 
        onClick={onClose} 
      />
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__logo-circle" style={{ position: 'relative', overflow: 'hidden' }}>
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
          </div>
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <span className="sidebar__logo-name">Daniel Ortega</span>
            <div className="sidebar__logo-subtitle">Archivo Biográfico Digital</div>
            <div style={{ fontSize: '8px', color: 'var(--accent-gold)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>
              Memoria, Historia y Legado
            </div>
          </div>
        </div>

        <nav className="sidebar__nav">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar__nav-item ${isActive && !item.to.includes('#') ? 'sidebar__nav-item--active' : ''}`
              }
              onClick={onClose}
            >
              <span className="sidebar__nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="sidebar__nav-divider" />

          {isAuthenticated ? (
            <>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
                }
                onClick={onClose}
              >
                <span className="sidebar__nav-icon"><IoSettingsOutline /></span>
                <span>Panel de Administración</span>
              </NavLink>
              <button
                className="sidebar__nav-item"
                style={{ width: '100%', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                onClick={() => {
                  logout();
                  navigate('/');
                  onClose && onClose();
                }}
              >
                <span className="sidebar__nav-icon"><IoLogOutOutline /></span>
                <span>Cerrar Sesión ({user?.username})</span>
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
              }
              onClick={onClose}
            >
              <span className="sidebar__nav-icon"><IoLogInOutline /></span>
              <span>Iniciar Sesión</span>
            </NavLink>
          )}
        </nav>

        <div className="sidebar__footer">
          <button 
            type="button"
            className={`sidebar__offline-btn ${offlineMode ? 'sidebar__offline-btn--active' : ''}`}
            onClick={toggleOffline}
          >
            <IoCloudDownloadOutline style={{ fontSize: '18px' }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>MODO SIN CONEXIÓN</div>
              <div style={{ fontSize: '9px', opacity: 0.8 }}>Contenido descargado</div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
