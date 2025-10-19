import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Landing from './pages/Landing'
import Join from './pages/Join'
import Dashboard from './pages/Dashboard'
import Planner from './pages/Planner'
import Notes from './pages/Notes'


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<BrowserRouter>
<Routes>
<Route element={<App />}>
<Route index element={<Landing />} />
<Route path="/join" element={<Join />} />
<Route path="/app" element={<Dashboard />} />
<Route path="/app/course/:id/plan" element={<Planner />} />
<Route path="/app/course/:id/notes" element={<Notes />} />
</Route>
</Routes>
</BrowserRouter>
</React.StrictMode>
)
