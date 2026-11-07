import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  IoHomeOutline,
  IoHome,
  IoSearchOutline,
  IoCalendarOutline,
  IoCalendar,
  IoPersonOutline,
  IoPerson
} from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const scrollToSearch = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('buscador');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive && !location.hash ? 'bottom-nav__item--active' : ''}`
        }
      >
        {({ isActive }) => (
          <>
            <span className="bottom-nav__icon">
              {isActive && !location.hash ? <IoHome /> : <IoHomeOutline />}
            </span>
            <span className="bottom-nav__label">Inicio</span>
          </>
        )}
      </NavLink>

      <a
        href="/#buscador"
        onClick={scrollToSearch}
        className="bottom-nav__item"
      >
        <span className="bottom-nav__icon">
          <IoSearchOutline />
        </span>
        <span className="bottom-nav__label">Buscar</span>
      </a>

      <NavLink
        to="/linea-de-tiempo"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`
        }
      >
        {({ isActive }) => (
          <>
            <span className="bottom-nav__icon">
              {isActive ? <IoCalendar /> : <IoCalendarOutline />}
            </span>
            <span className="bottom-nav__label">Tiempo</span>
          </>
        )}
      </NavLink>

      <NavLink
        to={isAuthenticated ? "/admin" : "/login"}
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`
        }
      >
        {({ isActive }) => (
          <>
            <span className="bottom-nav__icon">
              {isActive ? <IoPerson /> : <IoPersonOutline />}
            </span>
            <span className="bottom-nav__label">{isAuthenticated ? 'Admin' : 'Perfil'}</span>
          </>
        )}
      </NavLink>
    </nav>
  );
};

export default BottomNav;
