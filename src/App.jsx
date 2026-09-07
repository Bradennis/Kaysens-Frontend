import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import BusinessesIndex from "./pages/BusinessesIndex";
import BusinessDetail from "./pages/BusinessDetail";
import Csr from "./pages/Csr";
import NewsIndex from "./pages/NewsIndex";
import NewsDetail from "./pages/NewsDetail";
import ResourcesIndex from "./pages/ResourcesIndex";
import ResourcesVideos from "./pages/ResourcesVideos";
import ResourcesGallery from "./pages/ResourcesGallery";
import ResourcesNews from "./pages/ResourcesNews";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import BusinessesAdmin from "./pages/admin/BusinessesAdmin";
import LeadersAdmin from "./pages/admin/LeadersAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import CsrAdmin from "./pages/admin/CsrAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import VideosAdmin from "./pages/admin/VideosAdmin";
import StatsAdmin from "./pages/admin/StatsAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";

export default function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/businesses" element={<BusinessesIndex />} />
        <Route path="/businesses/:slug" element={<BusinessDetail />} />
        <Route path="/csr" element={<Csr />} />
        <Route path="/news" element={<NewsIndex />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/resources" element={<ResourcesIndex />} />
        <Route path="/resources/videos" element={<ResourcesVideos />} />
        <Route path="/resources/gallery" element={<ResourcesGallery />} />
        <Route path="/resources/news" element={<ResourcesNews />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin CMS */}
      <Route path="/admin/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="businesses" element={<BusinessesAdmin />} />
          <Route path="leaders" element={<LeadersAdmin />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path="csr" element={<CsrAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="videos" element={<VideosAdmin />} />
          <Route path="stats" element={<StatsAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
