// src/App.jsx
import { Routes, Route } from "react-router-dom"; // ← دیگه BrowserRouter رو import نکن!
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BoardDetail from "./pages/BoardDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Modal from "./components/ui/Modal";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    // ❌ این رو حذف کن: <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
        </Route>
        <Route path="/modal" element={<Modal />} />
        {/* <Route path="/calendar" element={<Calendar />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    // ❌ این رو حذف کن: </BrowserRouter>
  );
}

export default App;
