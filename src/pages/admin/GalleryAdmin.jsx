import React, { useState, useEffect } from 'react';
import { IoAdd, IoTrash } from 'react-icons/io5';
import api from '../../api/axios';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const GalleryAdmin = () => {
  const [photos, setPhotos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    decade: '1970s',
    category: 'historico'
  });

  const fetchPhotos = async () => {
    try {
      const res = await api.get('/gallery');
      setPhotos(res.data);
    } catch (err) {
      toast.error('Error al cargar la galería');
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) {
      toast.error('Título e imagen son obligatorios');
      return;
    }
    try {
      await api.post('/gallery', form);
      toast.success('Fotografía agregada a la galería');
      setModalOpen(false);
      setForm({ title: '', description: '', imageUrl: '', decade: '1970s', category: 'historico' });
      fetchPhotos();
    } catch (err) {
      toast.error('Error al guardar la foto');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar esta fotografía?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Fotografía eliminada');
      fetchPhotos();
    } catch (err) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div style={{ padding: '30px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'var(--accent-gold)', fontSize: '24px', margin: 0, textTransform: 'uppercase' }}>
            Administrar Galería Histórica
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
            Sube y clasifica fotografías por década.
          </p>
        </div>
        <button type="button" className="btn btn--gold" onClick={() => setModalOpen(true)}>
          <IoAdd style={{ marginRight: '6px' }} /> Nueva Fotografía
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {photos.map((p) => (
          <div key={p._id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
            <img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '12px' }}>
              <span style={{ fontSize: '10px', color: 'var(--accent-gold)', fontWeight: 'bold' }}>{p.decade}</span>
              <h5 style={{ color: '#fff', fontSize: '13px', margin: '4px 0 8px 0' }}>{p.title}</h5>
              <button
                type="button"
                onClick={() => handleDelete(p._id)}
                style={{ background: 'rgba(244,67,54,0.1)', border: '1px solid #f44336', color: '#f44336', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }}
              >
                <IoTrash style={{ marginRight: '4px' }} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Agregar Fotografía Histórica">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>URL de la Imagen *</label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Década</label>
            <select
              value={form.decade}
              onChange={(e) => setForm({ ...form, decade: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            >
              {['1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Descripción</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="btn btn--outline" onClick={() => setModalOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn--gold">Guardar Foto</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GalleryAdmin;
