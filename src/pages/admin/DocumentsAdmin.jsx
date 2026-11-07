import React, { useState, useEffect } from 'react';
import { IoAdd, IoTrash } from 'react-icons/io5';
import api from '../../api/axios';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const DocumentsAdmin = () => {
  const [docs, setDocs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'libro',
    author: 'Daniel Ortega Saavedra',
    date: '',
    pages: 100,
    fileUrl: '#'
  });

  const fetchDocs = async () => {
    try {
      const res = await api.get('/documents');
      setDocs(res.data);
    } catch (err) {
      toast.error('Error al cargar documentos');
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/documents', form);
      toast.success('Documento cargado al archivo');
      setModalOpen(false);
      setForm({ title: '', description: '', category: 'libro', author: 'Daniel Ortega Saavedra', date: '', pages: 100, fileUrl: '#' });
      fetchDocs();
    } catch (err) {
      toast.error('Error al guardar documento');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Deseas eliminar este documento?')) return;
    try {
      await api.delete(`/documents/${id}`);
      toast.success('Documento eliminado');
      fetchDocs();
    } catch (err) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div style={{ padding: '30px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'var(--accent-gold)', fontSize: '24px', margin: 0, textTransform: 'uppercase' }}>
            Administrar Biblioteca Documental
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
            Libros, manifiestos, proclamas y ensayos digitalizados.
          </p>
        </div>
        <button type="button" className="btn btn--gold" onClick={() => setModalOpen(true)}>
          <IoAdd style={{ marginRight: '6px' }} /> Nuevo Documento
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Título</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Autor</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Categoría</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)' }}>Descargas</th>
              <th style={{ padding: '12px 16px', color: 'var(--accent-gold)', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 'bold' }}>{d.title}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{d.author}</td>
                <td style={{ padding: '12px 16px', color: 'var(--accent-gold)', textTransform: 'capitalize' }}>{d.category}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{d.downloadCount || 0}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleDelete(d._id)}
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Agregar Documento / Libro">
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
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Autor</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
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
                <option value="libro">Libro</option>
                <option value="articulo">Artículo</option>
                <option value="informe">Informe</option>
                <option value="discurso">Discurso</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>Año / Fecha</label>
              <input
                type="text"
                value={form.date}
                placeholder="Ej. 1980"
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '4px' }}>URL o Enlace de Descarga</label>
            <input
              type="text"
              value={form.fileUrl}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
            />
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
            <button type="submit" className="btn btn--gold">Guardar Documento</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DocumentsAdmin;
