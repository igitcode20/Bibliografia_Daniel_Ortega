import React, { useState } from 'react';
import { IoMenu, IoSearchOutline } from 'react-icons/io5';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <header className="mobile-header">
        <button
          className="mobile-header__hamburger"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menú"
        >
          <IoMenu />
        </button>
        <div className="mobile-header__title">
          ARCHIVO BIOGRÁFICO DIGITAL
        </div>
        <a
          href="/#buscador"
          className="mobile-header__search-btn"
          aria-label="Buscar"
          style={{ color: 'var(--accent-gold)', fontSize: '20px', display: 'flex', alignItems: 'center' }}
        >
          <IoSearchOutline />
        </a>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="app-layout__content">
        {children}
      </main>

      <BottomNav />
    </div>
  );
};

export default Layout;
