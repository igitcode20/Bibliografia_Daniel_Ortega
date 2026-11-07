import React, { useState, useEffect } from 'react';
import { IoDownloadOutline, IoDocumentTextOutline } from 'react-icons/io5';
import api from '../api/axios';
import { toast } from 'react-toastify';

const realDocuments = [
  {
    _id: '1',
    title: 'Nicaragua Insurreta',
    category: 'libro',
    author: 'Daniel Ortega Saavedra',
    date: '1979',
    pages: 215,
    downloadCount: 1420,
    fileUrl: '#',
    description: 'Análisis testimonial de la insurrección popular sandinista y la estrategia de liberación nacional.'
  },
  {
    _id: '2',
    title: 'El Sueño de Bolívar',
    category: 'libro',
    author: 'Daniel Ortega Saavedra',
    date: '1985',
    pages: 180,
    downloadCount: 980,
    fileUrl: '#',
    description: 'La vigencia del pensamiento bolivariano y sandinista en la unidad de los pueblos de América Latina.'
  },
  {
    _id: '3',
    title: 'La Revolución y la Paz',
    category: 'libro',
    author: 'Daniel Ortega Saavedra',
    date: '1988',
    pages: 240,
    downloadCount: 1150,
    fileUrl: '#',
    description: 'Los acuerdos de Esquipulas II y la búsqueda inclaudicable de la paz en Centroamérica.'
  },
  {
    _id: '4',
    title: 'Programa Histórico del FSLN',
    category: 'articulo',
    author: 'Dirección Nacional del FSLN',
    date: '1969',
    pages: 48,
    downloadCount: 2300,
    fileUrl: '#',
    description: 'Los postulados doctrinarios fundamentales de la Revolución Popular Sandinista.'
  }
];

const Documents = ({ preview = false }) => {
  const [docs, setDocs] = useState(realDocuments);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await api.get('/documents');
        if (res.data && res.data.length > 0) {
          setDocs(res.data);
        }
      } catch (err) {
        // Mantiene realDocuments
      }
    };
    fetchDocs();
  }, []);

  const categories = ['Todos', 'Libros', 'Artículos', 'Informes', 'Discursos'];

  const filteredDocs = selectedCategory === 'Todos'
    ? docs
    : docs.filter((d) => {
        const cat = d.category?.toLowerCase() || '';
        const selected = selectedCategory.toLowerCase().slice(0, -1);
        return cat.includes(selected);
      });

  const displayDocs = preview ? filteredDocs.slice(0, 4) : filteredDocs;

  const handleDownload = (doc) => {
    toast.success(`Descargando: "${doc.title}" (PDF)`);
    if (doc._id && !doc._id.startsWith('default')) {
      api.put(`/documents/${doc._id}/download`).catch(() => {});
    }
  };

  return (
    <section className="section" id="documentos">
      <div className="section__header">
        <h2 className="section__title">BIBLIOTECA DOCUMENTAL</h2>
      </div>

      <div className="filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-tabs__btn ${selectedCategory === cat ? 'filter-tabs__btn--active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="documents__grid">
        {displayDocs.map((doc) => (
          <div key={doc._id || doc.title} className="document-card">
            <div className="document-card__icon">
              <IoDocumentTextOutline />
            </div>

            <div className="document-card__content">
              <h4 className="document-card__title">{doc.title}</h4>
              <div className="document-card__author">{doc.author || 'Daniel Ortega'}</div>
              <p className="document-card__desc">{doc.description}</p>

              <div className="document-card__footer">
                <span className="document-card__downloads">
                  {doc.pages ? `${doc.pages} págs • ` : ''}{doc.downloadCount || 0} descargas
                </span>
                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="document-card__download-btn"
                >
                  <IoDownloadOutline style={{ marginRight: '4px' }} /> Descargar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Documents;
