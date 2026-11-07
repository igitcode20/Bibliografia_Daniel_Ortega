import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas públicas
import Home from './pages/Home';
import BiographyPage from './pages/BiographyPage';
import TimelinePage from './pages/TimelinePage';
import GalleryPage from './pages/GalleryPage';
import VideosPage from './pages/VideosPage';
import DocumentsPage from './pages/DocumentsPage';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';

// Páginas de administración
import AdminPanel from './pages/AdminPanel';
import UserManagement from './pages/admin/UserManagement';
import TimelineAdmin from './pages/admin/TimelineAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import VideosAdmin from './pages/admin/VideosAdmin';
import DocumentsAdmin from './pages/admin/DocumentsAdmin';
import MapAdmin from './pages/admin/MapAdmin';
import BiographyAdmin from './pages/admin/BiographyAdmin';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/biografia" element={<BiographyPage />} />
        <Route path="/linea-de-tiempo" element={<TimelinePage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/documentos" element={<DocumentsPage />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/contexto" element={<BiographyPage />} />
        <Route path="/comparador" element={<TimelinePage />} />
        <Route path="/favoritos" element={<GalleryPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Panel y Gestión Administrativa */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute adminOnly={true}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/timeline"
          element={
            <ProtectedRoute>
              <TimelineAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/galeria"
          element={
            <ProtectedRoute>
              <GalleryAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <ProtectedRoute>
              <VideosAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/documentos"
          element={
            <ProtectedRoute>
              <DocumentsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/mapa"
          element={
            <ProtectedRoute>
              <MapAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/biografia"
          element={
            <ProtectedRoute>
              <BiographyAdmin />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
