import React, { useState, useEffect } from 'react';
import { IoAdd, IoTrash, IoPencil } from 'react-icons/io5';
import api from '../../api/axios';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const TimelineAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    year: new Date().getFullYear(),
    title: '',
    description: '',
    category: 'politico',
    imageUrl: '',
    detailedContent: '',
    sources: ''
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/timeline');
      setEvents(res.data);
    } catch (err) {
      toast.error('Error al cargar la línea de tiempo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      year: new Date().getFullYear(),
      title: '',
      description: '',
      category: 'politico',
      imageUrl: '',
      detailedContent: '',
      sources: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ev) => {
    setEditingId(ev._id);
    setForm({
      year: ev.year,
      title: ev.title,
      description: ev.description,
      category: ev.category || 'politico',
      imageUrl: ev.imageUrl || '',
      detailedContent: ev.detailedContent || '',
      sources: Array.isArray(ev.sources) ? ev.sources.join(', ') : ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      year: Number(form.year),
      sources: form.sources ? form.sources.split(',').map((s) => s.trim()) : []
    };

    try {
      if (editingId) {
        await api.put(`/timeline/${editingId}`, payload);
        toast.success('Hito histórico actualizado');
      } else {
        await api.post('/timeline', payload);
        toast.success('Hito histórico agregado con éxito');
      }
      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al guardar');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`¿Eliminar el evento "${title}"?`)) return;
    try {
      await api.delete(`/timeline/${id}`);
      toast.success('Evento eliminado');
      fetchEvents();
    } catch (err) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div style={{ padding: '30px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ color: 'var(--accent-gold)', fontSize: '24px', margin: 0, textTransform: 'uppercase' }}>
            Administrar Línea de Tiempo
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
            Registra nuevos acontecimientos, fechas y fotografías históricas.
          </p>
        </div>

        <button type="button" className="btn btn--gold" onClick={handleOpenCreate}>
          <IoAdd style={{ marginRight: '6px' }} /> Agregar Acontecimiento
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--accent-gold)' }}>Cargando eventos...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Año</th>
                <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Título</th>
                <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Categoría</th>
                <th style={{ padding: '12px 16px', color: 'var(--accent-gold)', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 'bold', color: 'var(--accent-gold)' }}>{ev.year}</td>
                  <td style={{ padding: '12px 16px', color: '#fff' }}>{ev.title}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{ev.category}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(ev)}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', marginRight: '10px' }}
                    >
                      <IoPencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(ev._id, ev.title)}
                      style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer' }}
                    >
                      <IoTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Editar Evento' : 'Nuevo Evento'}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Año *</label>
            <input
              type="number"
              required
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Título *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Descripción Corta *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>URL de Imagen</label>
            <input
              type="url"
              value={form.imageUrl}
              placeholder="https://..."
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Contenido Detallado</label>
            <textarea
              rows={4}
              value={form.detailedContent}
              onChange={(e) => setForm({ ...form, detailedContent: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Fuentes (separadas por comas)</label>
            <input
              type="text"
              value={form.sources}
              placeholder="Archivo General, Gaceta Oficial, ..."
              onChange={(e) => setForm({ ...form, sources: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="btn btn--outline" onClick={() => setModalOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn--gold">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TimelineAdmin;
