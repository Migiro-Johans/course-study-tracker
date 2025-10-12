import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AppShell from './components/AppShell'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Planner from './pages/Planner'
import AI from './pages/AI'

export default function App() {
  const loc = useLocation()
  return (
    <Routes location={loc} key={loc.pathname}>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="planner" element={<Planner />} />
        <Route path="ai" element={<AI />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}