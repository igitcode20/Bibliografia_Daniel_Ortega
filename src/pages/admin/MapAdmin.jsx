import React, { useState, useEffect } from 'react';
import { IoAdd, IoTrash } from 'react-icons/io5';
import api from '../../api/axios';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const MapAdmin = () => {
  const [locations, setLocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    latitude: 12.1364,
    longitude: -86.2514,
    category: 'historico',
    year: 1979,
    details: ''
  });

  const fetchLocations = async () => {
    try {
      const res = await api.get('/map-locations');
      setLocations(res.data);
    } catch (err) {
      toast.error('Error al cargar sitios');
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/map-locations', {
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        year: form.year ? parseInt(form.year, 10) : undefined
      });
      toast.success('Lugar histórico registrado en el mapa');
      setModalOpen(false);
      setForm({ name: '', description: '', latitude: 12.1364, longitude: -86.2514, category: 'historico', year: 1979, details: '' });
      fetchLocations();
    } catch (err) {
      toast.error('Error al guardar la ubicación');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar este punto del mapa?')) return;
    try {
      await api.delete(`/map-locations/${id}`);
      toast.success('Punto eliminado');
      fetchLocations();
    } catch (err) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div style={{ padding: '30px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'var(--accent-gold)', fontSize: '24px', margin: 0, textTransform: 'uppercase' }}>
            Administrar Mapa Histórico
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
            Localidades y municipios protagonistas de la historia nicaragüense.
          </p>
        </div>
        <button type="button" className="btn btn--gold" onClick={() => setModalOpen(true)}>
          <IoAdd style={{ marginRight: '6px' }} /> Nueva Ubicación
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Nombre</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Coordenadas</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Año</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 'bold' }}>{loc.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                  {loc.latitude.toFixed(3)}, {loc.longitude.toFixed(3)}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>{loc.year || '—'}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleDelete(loc._id)}
                    style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer' }}
                  >
                    <IoTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Registrar Ubicación en el Mapa">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Nombre del Lugar *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Latitud *</label>
              <input
                type="number"
                step="any"
                required
                value={form.latitude}
                onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Longitud *</label>
              <input
                type="number"
                step="any"
                required
                value={form.longitude}
                onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Descripción Sintética *</label>
            <input
              type="text"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Detalles Históricos Completos</label>
            <textarea
              rows={3}
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="btn btn--outline" onClick={() => setModalOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn--gold">Guardar Lugar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MapAdmin;
