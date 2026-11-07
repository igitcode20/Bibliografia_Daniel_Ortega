import React, { useState, useEffect } from 'react';
import { IoAdd, IoTrash, IoShieldCheckmark, IoPerson, IoKeyOutline } from 'react-icons/io5';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    role: 'editor'
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      toast.error('Error al cargar la lista de usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) {
      toast.error('Usuario y contraseña son obligatorios');
      return;
    }

    try {
      await api.post('/users', form);
      toast.success(`Usuario "${form.username}" creado exitosamente`);
      setForm({ username: '', password: '', email: '', role: 'editor' });
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al crear el usuario';
      toast.error(msg);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}`, { role: newRole });
      toast.success('Rol actualizado con éxito');
      fetchUsers();
    } catch (err) {
      toast.error('No se pudo actualizar el rol');
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (username === currentUser?.username) {
      toast.error('No puedes eliminar tu propia cuenta en uso');
      return;
    }

    if (!window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${username}"?`)) {
      return;
    }

    try {
      await api.delete(`/users/${userId}`);
      toast.success(`Usuario "${username}" eliminado`);
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al eliminar usuario';
      toast.error(msg);
    }
  };

  return (
    <div style={{ padding: '30px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ color: 'var(--accent-gold)', fontSize: '24px', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Gestión de Usuarios y Accesos
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
            Agrega usuarios con permisos para subir, modificar o borrar contenidos.
          </p>
        </div>

        <button
          type="button"
          className="btn btn--gold"
          onClick={() => setModalOpen(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <IoAdd style={{ fontSize: '18px' }} /> Agregar Nuevo Usuario
        </button>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        overflow: 'hidden'
      }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--accent-gold)' }}>
            Cargando usuarios...
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '14px 18px', color: 'var(--accent-gold)' }}>Usuario</th>
                <th style={{ padding: '14px 18px', color: 'var(--accent-gold)' }}>Email</th>
                <th style={{ padding: '14px 18px', color: 'var(--accent-gold)' }}>Rol / Permisos</th>
                <th style={{ padding: '14px 18px', color: 'var(--accent-gold)' }}>Fecha Registro</th>
                <th style={{ padding: '14px 18px', color: 'var(--accent-gold)', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isMe = u.username === currentUser?.username;
                return (
                  <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 18px', fontWeight: '600', color: '#fff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IoPerson style={{ color: 'var(--accent-gold)' }} />
                        {u.username}
                        {isMe && (
                          <span style={{ fontSize: '10px', background: 'rgba(200, 168, 78, 0.2)', color: 'var(--accent-gold)', padding: '2px 6px', borderRadius: '4px' }}>
                            Tú
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>
                      {u.email || '—'}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <select
                        value={u.role}
                        disabled={isMe}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          color: u.role === 'admin' ? 'var(--accent-gold)' : 'var(--text-primary)',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        <option value="admin">Administrador (Total)</option>
                        <option value="editor">Editor (Subir/Modificar)</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--text-muted)', fontSize: '12px' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        type="button"
                        disabled={isMe}
                        onClick={() => handleDeleteUser(u._id, u.username)}
                        style={{
                          background: 'rgba(244, 67, 54, 0.1)',
                          border: '1px solid #f44336',
                          color: '#f44336',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          cursor: isMe ? 'not-allowed' : 'pointer',
                          opacity: isMe ? 0.3 : 1
                        }}
                        title="Eliminar usuario"
                      >
                        <IoTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal para crear usuario */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Crear Nuevo Usuario"
      >
        <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '6px' }}>
              Nombre de Usuario *
            </label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Ej. nuevo_editor"
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '6px' }}>
              Contraseña *
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Mínimo 6 caracteres"
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '6px' }}>
              Correo Electrónico (Opcional)
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ejemplo@correo.com"
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '6px' }}>
              Rol y Nivel de Acceso
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: '#fff'
              }}
            >
              <option value="editor">Editor (Subir y Modificar Contenido)</option>
              <option value="admin">Administrador (Acceso Total y Borrado)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn--gold"
            >
              Guardar Usuario
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
