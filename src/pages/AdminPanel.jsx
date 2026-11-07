import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IoPeopleOutline,
  IoCalendarOutline,
  IoImagesOutline,
  IoVideocamOutline,
  IoDocumentTextOutline,
  IoMapOutline,
  IoBookOutline
} from 'react-icons/io5';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    timelineEvents: 5,
    galleryPhotos: 8,
    videos: 3,
    documents: 4,
    mapLocations: 5,
    biographySections: 4,
    users: 1
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        if (res.data) setStats(res.data);
      } catch (err) {
        // En caso de modo offline o error de red mantiene valores por defecto
      }
    };
    fetchStats();
  }, []);

  const adminCards = [
    {
      title: 'Gestión de Usuarios',
      desc: 'Crear, modificar y borrar usuarios con roles Admin o Editor.',
      count: stats.users,
      icon: <IoPeopleOutline />,
      link: '/admin/usuarios',
      adminOnly: true
    },
    {
      title: 'Línea de Tiempo',
      desc: 'Subir, editar y eliminar hitos históricos y acontecimientos.',
      count: stats.timelineEvents,
      icon: <IoCalendarOutline />,
      link: '/admin/timeline'
    },
    {
      title: 'Galería Histórica',
      desc: 'Subir fotografías, organizar por décadas y actualizar fuentes.',
      count: stats.galleryPhotos,
      icon: <IoImagesOutline />,
      link: '/admin/galeria'
    },
    {
      title: 'Discursos y Videos',
      desc: 'Añadir discursos en la ONU, aniversarios, entrevistas y documentales.',
      count: stats.videos,
      icon: <IoVideocamOutline />,
      link: '/admin/videos'
    },
    {
      title: 'Biblioteca Documental',
      desc: 'Cargar libros, ensayos, artículos y proclamas históricas.',
      count: stats.documents,
      icon: <IoDocumentTextOutline />,
      link: '/admin/documentos'
    },
    {
      title: 'Mapa Histórico',
      desc: 'Agregar coordenadas y localidades clave de Nicaragua.',
      count: stats.mapLocations,
      icon: <IoMapOutline />,
      link: '/admin/mapa'
    },
    {
      title: 'Biografía Oficial',
      desc: 'Redactar y ordenar capítulos de la biografía del Comandante.',
      count: stats.biographySections,
      icon: <IoBookOutline />,
      link: '/admin/biografia'
    }
  ];

  return (
    <div style={{ padding: '30px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card), var(--bg-secondary))',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '24px 30px',
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
            Panel de Control Central
          </span>
          <h1 style={{ color: 'var(--text-primary)', fontSize: '24px', margin: '4px 0 0 0' }}>
            Bienvenido, {user?.username || 'Administrador'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '6px 0 0 0' }}>
            Rol actual: <strong style={{ color: 'var(--accent-gold)', textTransform: 'uppercase' }}>{user?.role || 'admin'}</strong>. Tienes facultades para crear, editar y eliminar recursos en todo el sistema.
          </p>
        </div>

        <div style={{
          background: 'rgba(200, 168, 78, 0.1)',
          border: '1px solid var(--accent-gold)',
          borderRadius: '10px',
          padding: '10px 18px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
            Activo
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Base de datos conectada
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {adminCards.map((card, i) => {
          if (card.adminOnly && !isAdmin) return null;
          return (
            <Link
              key={i}
              to={card.link}
              style={{
                textDecoration: 'none',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '28px', color: 'var(--accent-gold)' }}>
                    {card.icon}
                  </span>
                  <span style={{
                    background: 'rgba(200, 168, 78, 0.15)',
                    color: 'var(--accent-gold)',
                    padding: '2px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {card.count} registros
                  </span>
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '17px', margin: '0 0 8px 0' }}>
                  {card.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                  {card.desc}
                </p>
              </div>

              <div style={{
                marginTop: '18px',
                color: 'var(--accent-gold)',
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                Administrar &rarr;
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPanel;
