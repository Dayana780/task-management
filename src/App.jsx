// Main app routes
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BoardDetail from "./pages/BoardDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Modal from "./components/ui/Modal";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ActivityPage from "./pages/ActivityPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Protected routes with layout */}
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/activities" element={<ActivityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/boards" element={<BoardDetail />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
        </Route>
        <Route path="/modal" element={<Modal />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
