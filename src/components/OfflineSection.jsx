import React, { useState } from 'react';
import {
  IoCloudDownloadOutline,
  IoPhonePortraitOutline,
  IoAppsOutline,
  IoShieldCheckmarkOutline,
  IoSyncOutline,
  IoCompassOutline,
  IoLockClosedOutline,
  IoCheckmarkCircle
} from 'react-icons/io5';
import { toast } from 'react-toastify';

const OfflineSection = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadAll = () => {
    setDownloading(true);
    toast.info('Sincronizando archivo biográfico para uso sin conexión...');
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      toast.success('¡Contenido descargado en memoria local con éxito!');
    }, 1800);
  };

  const features = [
    { icon: <IoPhonePortraitOutline />, title: 'Multiplataforma', desc: 'Android, iOS y Web' },
    { icon: <IoAppsOutline />, title: 'Instalable como App', desc: '(PWA)' },
    { icon: <IoShieldCheckmarkOutline />, title: 'Contenido verificado', desc: 'y con fuentes' },
    { icon: <IoSyncOutline />, title: 'Actualizaciones', desc: 'periódicas' },
    { icon: <IoCompassOutline />, title: 'Navegación', desc: 'intuitiva' },
    { icon: <IoLockClosedOutline />, title: 'Seguridad y', desc: 'privacidad' }
  ];

  return (
    <section className="section" id="sin-conexion">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: '24px'
      }}>
        {/* Tarjeta Funciona sin conexión */}
        <div className="card">
          <div style={{
            color: 'var(--accent-gold)',
            fontSize: '14px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: '700',
            marginBottom: '8px'
          }}>
            FUNCIONA SIN CONEXIÓN
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>
            Descarga contenidos y accede a ellos en cualquier lugar y momento.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
            <button
              type="button"
              onClick={handleDownloadAll}
              disabled={downloading}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: downloaded ? 'rgba(76, 175, 80, 0.2)' : 'rgba(200, 168, 78, 0.1)',
                border: `2px solid ${downloaded ? 'var(--success)' : 'var(--accent-gold)'}`,
                color: downloaded ? 'var(--success)' : 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                cursor: downloading ? 'wait' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              title="Descargar para modo offline"
            >
              {downloaded ? <IoCheckmarkCircle /> : <IoCloudDownloadOutline />}
            </button>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>📄 Documentos PDF</span>
              <span style={{ color: 'var(--accent-gold)' }}>500+</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>🖼️ Galería de Fotos</span>
              <span style={{ color: 'var(--accent-gold)' }}>1500+</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>🎬 Videos Históricos</span>
              <span style={{ color: 'var(--accent-gold)' }}>300+</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadAll}
            className="btn btn--gold"
            style={{ width: '100%', marginTop: '16px', textAlign: 'center', justifyContent: 'center' }}
          >
            {downloading ? 'Descargando...' : downloaded ? 'Sincronizado Offline' : 'Sincronizar Offline'}
          </button>
        </div>

        {/* Características Principales */}
        <div className="card">
          <div style={{
            color: 'var(--accent-gold)',
            fontSize: '14px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            CARACTERÍSTICAS PRINCIPALES
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
            gap: '10px'
          }}>
            {features.map((feat, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '12px 6px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '95px'
                }}
              >
                <div style={{ fontSize: '22px', color: 'var(--accent-gold)', marginBottom: '4px' }}>
                  {feat.icon}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                  {feat.title}
                </div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {feat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfflineSection;
