import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const loc = useLocation()

  const navCls = isActive =>
    `text-sm font-medium hover:underline ${isActive ? 'text-blue-600' : 'text-gray-700'}`

  return (
    <div>
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-bold">Course & Study Tracker</Link>
          <nav className="flex items-center gap-4">
            <Link className={navCls(loc.pathname === '/')} to="/">Home</Link>
            <Link className={navCls(loc.pathname === '/join')} to="/join">Join</Link>
            <Link className={navCls(loc.pathname === '/app')} to="/app">App</Link>

            
            <Link className={navCls(loc.pathname === '/profile')} to="/profile">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="py-6">
        <Outlet /> {/* This renders nested routes like /profile */}
      </main>
    </div>
  )
}