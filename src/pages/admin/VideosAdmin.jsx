import React, { useState, useEffect } from 'react';
import { IoAdd, IoTrash } from 'react-icons/io5';
import api from '../../api/axios';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const VideosAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    category: 'discurso',
    duration: '',
    date: ''
  });

  const fetchVideos = async () => {
    try {
      const res = await api.get('/videos');
      setVideos(res.data);
    } catch (err) {
      toast.error('Error al cargar videos');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/videos', form);
      toast.success('Video agregado exitosamente');
      setModalOpen(false);
      setForm({ title: '', description: '', videoUrl: '', thumbnailUrl: '', category: 'discurso', duration: '', date: '' });
      fetchVideos();
    } catch (err) {
      toast.error('Error al guardar el video');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar este video?')) return;
    try {
      await api.delete(`/videos/${id}`);
      toast.success('Video eliminado');
      fetchVideos();
    } catch (err) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div style={{ padding: '30px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'var(--accent-gold)', fontSize: '24px', margin: 0, textTransform: 'uppercase' }}>
            Administrar Discursos y Videos
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
            Registra discursos, entrevistas y documentales históricos.
          </p>
        </div>
        <button type="button" className="btn btn--gold" onClick={() => setModalOpen(true)}>
          <IoAdd style={{ marginRight: '6px' }} /> Nuevo Video
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Título</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Categoría</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Fecha</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v) => (
              <tr key={v._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 'bold' }}>{v.title}</td>
                <td style={{ padding: '12px 16px', color: 'var(--accent-gold)', textTransform: 'capitalize' }}>{v.category}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{v.date || '—'}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleDelete(v._id)}
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Agregar Discurso o Video">
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
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>URL del Video (Embed o YouTube) *</label>
            <input
              type="url"
              required
              placeholder="https://www.youtube.com/embed/..."
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>URL Miniatura</label>
            <input
              type="url"
              placeholder="https://..."
              value={form.thumbnailUrl}
              onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Categoría</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
              >
                <option value="discurso">Discurso</option>
                <option value="entrevista">Entrevista</option>
                <option value="evento">Evento</option>
                <option value="documental">Documental</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Duración (ej: 45:00)</label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
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
            <button type="submit" className="btn btn--gold">Guardar Video</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VideosAdmin;
