import React, { useState } from 'react';
import { IoSend, IoSparkles, IoDocumentTextOutline } from 'react-icons/io5';
import Modal from './Modal';

const knowledgeBase = [
  {
    keywords: ['1984', 'elecciones', 'proceso'],
    answer: `En 1984 ocurrieron varios acontecimientos fundamentales en la historia política contemporánea de Nicaragua:
• Proceso electoral nacional: Primeras elecciones generales libres y transparentes bajo el nuevo marco revolucionario.
• Victoria del FSLN: Daniel Ortega fue electo Presidente de la República con más del 67% de los votos válidos.
• Fortalecimiento de la institucionalidad: Se sentaron las bases para la redacción de la Constitución Política de 1987.
• Avances continuos en salud y programas educativos frente al bloqueo y agresiones externas.`,
    sources: [
      'Archivo Histórico de la Presidencia de la República',
      'Documentos y Proclamas del FSLN (1984)',
      'Periódicos nacionales El Nuevo Diario y Barricada (1984)',
      'Consejo Supremo Electoral de Nicaragua - Informe Final de Comicios 1984'
    ]
  },
  {
    keywords: ['1979', 'revolucion', 'triunfo', 'sandinista'],
    answer: `El 19 de julio de 1979 marca la victoria definitiva de la Revolución Popular Sandinista:
• Caída de la dinastía somocista tras más de 40 años de dictadura militar.
• Entrada triunfal de las columnas guerrilleras a Managua con respaldo masivo del pueblo.
• Constitución de la Junta de Gobierno de Reconstrucción Nacional, con Daniel Ortega como coordinador.
• Inicio de la Cruzada Nacional de Alfabetización (1980) y la reforma agraria integral.`,
    sources: [
      'Decretos Fundacionales de la Junta de Gobierno de Reconstrucción Nacional',
      'Archivo de la Revolución Popular Sandinista',
      'Diario Barricada, Edición Histórica del 20 de Julio de 1979'
    ]
  },
  {
    keywords: ['alfabetizacion', 'cruzada', '1980', 'educacion'],
    answer: `La Gran Cruzada Nacional de Alfabetización "Héroes y Mártires por la Liberación de Nicaragua" (1980):
• Movilizó a más de 95,000 brigadistas y educadores en todo el territorio nacional.
• Redujo el índice de analfabetismo del 50.3% a un histórico 12.9%.
• Reconocida por la UNESCO con la distinción Nadezhda Krúpskaya por su impacto humanista y social.`,
    sources: [
      'Ministerio de Educación de Nicaragua (MED, 1980)',
      'Documentos Oficiales UNESCO - Distinción de Alfabetización 1980'
    ]
  },
  {
    keywords: ['2007', 'retorno', 'paz', 'gratuidad'],
    answer: `En enero de 2007 se inicia la segunda etapa de la Revolución:
• Decretos inmediatos restituyendo la gratuidad universal de la salud pública y la educación básica y media.
• Lanzamiento de programas sociales emblemáticos: Hambre Cero, Usura Cero, Casas para el Pueblo y Merienda Escolar.
• Crecimiento sostenido en cobertura eléctrica (de 54% a más del 99%) y modernización de la red vial nacional.`,
    sources: [
      'Gaceta Oficial - Decretos Ejecutivos de Enero 2007',
      'Plan Nacional de Desarrollo Humano (PNDH) de Nicaragua'
    ]
  }
];

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: '¿Qué acontecimientos ocurrieron en Nicaragua en 1984?'
    },
    {
      sender: 'ai',
      text: knowledgeBase[0].answer,
      sources: knowledgeBase[0].sources
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSourcesModal, setActiveSourcesModal] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setInputQuery('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    setTimeout(() => {
      const qLower = userText.toLowerCase();
      const matched = knowledgeBase.find((item) =>
        item.keywords.some((kw) => qLower.includes(kw))
      );

      if (matched) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: matched.answer,
            sources: matched.sources
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Sobre "${userText}", el Archivo Biográfico Digital cuenta con documentos, discursos y testimonios históricos digitalizados. Te recomendamos explorar la Línea de Tiempo y la Biblioteca Documental para consultar la información oficial completa y verificada.`,
            sources: [
              'Archivo General de la Nación de Nicaragua',
              'Fondo Documental Presidencial Sandinista'
            ]
          }
        ]);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '440px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <IoSparkles style={{ color: 'var(--accent-gold)', fontSize: '20px' }} />
        <h3 style={{ margin: 0, color: 'var(--accent-gold)', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          ASISTENTE HISTÓRICO CON IA
        </h3>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        paddingRight: '6px',
        marginBottom: '16px'
      }}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '92%',
              background: m.sender === 'user' ? '#4a1515' : 'var(--bg-secondary)',
              border: `1px solid ${m.sender === 'user' ? 'var(--accent-gold)' : 'var(--border-color)'}`,
              borderRadius: '12px',
              padding: '14px 16px'
            }}
          >
            {m.sender === 'ai' && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                color: 'var(--accent-gold)',
                fontWeight: 'bold',
                marginBottom: '6px',
                textTransform: 'uppercase'
              }}>
                <span style={{
                  background: 'var(--accent-gold)',
                  color: '#1a0a0a',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px'
                }}>IA</span>
                Memoria Digital
              </div>
            )}
            <div style={{
              color: 'var(--text-primary)',
              fontSize: '13.5px',
              lineHeight: '1.6',
              whiteSpace: 'pre-line'
            }}>
              {m.text}
            </div>

            {m.sources && (
              <button
                type="button"
                onClick={() => setActiveSourcesModal(m.sources)}
                style={{
                  marginTop: '10px',
                  background: 'rgba(200, 168, 78, 0.12)',
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <IoDocumentTextOutline /> VER FUENTES
              </button>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ color: 'var(--accent-gold)', fontSize: '13px', fontStyle: 'italic' }}>
            Consultando archivo histórico...
          </div>
        )}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Escribe tu pregunta histórica..."
          style={{
            flex: 1,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px'
          }}
        />
        <button
          type="submit"
          className="btn btn--gold"
          style={{ padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Enviar pregunta"
        >
          <IoSend />
        </button>
      </form>

      <Modal
        isOpen={Boolean(activeSourcesModal)}
        onClose={() => setActiveSourcesModal(null)}
        title="Fuentes Históricas Consultadas"
      >
        {activeSourcesModal && (
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
              Este extracto informativo fue contrastado con los siguientes fondos archivísticos y publicaciones oficiales:
            </p>
            <ul style={{ paddingLeft: '20px', color: 'var(--accent-gold)', lineHeight: '1.8', fontSize: '13.5px' }}>
              {activeSourcesModal.map((src, i) => (
                <li key={i}><span style={{ color: 'var(--text-primary)' }}>{src}</span></li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AIAssistant;
