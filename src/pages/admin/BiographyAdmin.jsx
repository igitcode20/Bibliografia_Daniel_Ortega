import React, { useState, useEffect } from 'react';
import { IoAdd, IoTrash, IoPencil } from 'react-icons/io5';
import api from '../../api/axios';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const BiographyAdmin = () => {
  const [sections, setSections] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    section: '',
    order: 1,
    imageUrl: '',
    content: ''
  });

  const fetchSections = async () => {
    try {
      const res = await api.get('/biography');
      setSections(res.data);
    } catch (err) {
      toast.error('Error al cargar la biografía');
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({ title: '', section: '', order: sections.length + 1, imageUrl: '', content: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (sec) => {
    setEditingId(sec._id);
    setForm({
      title: sec.title,
      section: sec.section,
      order: sec.order || 1,
      imageUrl: sec.imageUrl || '',
      content: sec.content || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/biography/${editingId}`, form);
        toast.success('Sección biográfica actualizada');
      } else {
        await api.post('/biography', form);
        toast.success('Capítulo biográfico agregado');
      }
      setModalOpen(false);
      fetchSections();
    } catch (err) {
      toast.error('Error al guardar la sección');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar este capítulo?')) return;
    try {
      await api.delete(`/biography/${id}`);
      toast.success('Capítulo eliminado');
      fetchSections();
    } catch (err) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div style={{ padding: '30px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'var(--accent-gold)', fontSize: '24px', margin: 0, textTransform: 'uppercase' }}>
            Administrar Biografía Oficial
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
            Capítulos, redacción testimonial y fotografías de la trayectoria vital.
          </p>
        </div>
        <button type="button" className="btn btn--gold" onClick={handleOpenCreate}>
          <IoAdd style={{ marginRight: '6px' }} /> Nuevo Capítulo
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Orden</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Título del Capítulo</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Identificador</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((s) => (
              <tr key={s._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 'bold', color: 'var(--accent-gold)' }}>#{s.order}</td>
                <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 'bold' }}>{s.title}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{s.section}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(s)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', marginRight: '8px' }}
                  >
                    <IoPencil size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s._id)}
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Editar Capítulo' : 'Nuevo Capítulo Biográfico'}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
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
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Orden</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value, 10) || 1 })}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Identificador de Sección (clave única) *</label>
            <input
              type="text"
              required
              placeholder="ej: infancia, juventud, gobierno..."
              value={form.section}
              onChange={(e) => setForm({ ...form, section: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>URL de Fotografía</label>
            <input
              type="url"
              placeholder="https://..."
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Texto Biográfico Completo *</label>
            <textarea
              required
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="btn btn--outline" onClick={() => setModalOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn--gold">Guardar Capítulo</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BiographyAdmin;
