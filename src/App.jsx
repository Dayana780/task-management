// src/App.jsx
import { Routes, Route } from "react-router-dom"; // ← دیگه BrowserRouter رو import نکن!
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
    <>
      <Routes>
        <Route path="/" element={<Login />} />

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
