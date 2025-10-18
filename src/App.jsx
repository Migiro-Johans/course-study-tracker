import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import Login from './pages/login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Courses from './pages/Courses.jsx'
import Planner from './pages/Planner.jsx'
import AI from './pages/AI.jsx'

export default function App() {
  const loc = useLocation()
  return (
    <Routes location={loc} key={loc.pathname}>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Private */}
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="planner" element={<Planner />} />
        <Route path="ai" element={<AI />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}