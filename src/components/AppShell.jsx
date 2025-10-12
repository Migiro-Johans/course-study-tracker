import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AppShell() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const tab = 'px-3 py-2 rounded-lg text-sm'
  const active = ({ isActive }) => isActive ? `${tab} bg-gray-200` : `${tab} hover:bg-gray-100`

  return (
    <div className="max-w-md mx-auto min-h-[100dvh] flex flex-col">
      <header className="p-3 flex items-center justify-between border-b">
        <div className="font-semibold">Study Tracker</div>
        <button onClick={signOut} className="text-sm underline">Sign out</button>
      </header>

      <nav className="p-2 flex gap-2 sticky top-0 bg-white/70 backdrop-blur border-b">
        <NavLink to="/" className={active}>Dashboard</NavLink>
        <NavLink to="/courses" className={active}>Courses</NavLink>
        <NavLink to="/planner" className={active}>Planner</NavLink>
        <NavLink to="/ai" className={active}>AI</NavLink>
      </nav>

      <main className="flex-1 p-3">
        <Outlet />
      </main>
    </div>
  )
}