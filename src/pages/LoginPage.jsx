import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';

const LoginPage = () => {
  const [username, setUsername] = useState('ismaelgit20');
  const [password, setPassword] = useState('ismaelgit20123');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast.error('Por favor ingresa usuario y contraseña');
      return;
    }

    setSubmitting(true);
    try {
      await login(username.trim(), password);
      toast.success(`¡Bienvenido, ${username}!`);
      navigate('/admin');
    } catch (err) {
      const msg = err.response?.data?.message || 'Credenciales incorrectas o servidor no disponible';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '36px 30px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.6)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #5a2020 0%, #1a0a0a 100%)',
            border: '2px solid var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px'
          }}>
            <span style={{ fontSize: '24px', color: 'var(--accent-gold)', fontWeight: 'bold' }}>DO</span>
          </div>
          <h2 style={{ color: 'var(--accent-gold)', fontSize: '20px', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>
            Acceso Administrativo
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '6px' }}>
            Archivo Biográfico Digital
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '6px' }}>
              Nombre de Usuario
            </label>
            <div style={{ position: 'relative' }}>
              <IoPersonOutline style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ej. ismaelgit20"
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '6px' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <IoLockClosedOutline style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn--gold"
            style={{ width: '100%', marginTop: '10px', padding: '12px', fontSize: '14px', fontWeight: 'bold' }}
          >
            {submitting ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <div><strong>Credencial inicial de Administrador:</strong></div>
          <div>Usuario: <code>Anonimo</code></div>
          <div>Contraseña: <code>Anonimo</code></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
