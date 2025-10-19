import { Outlet, Link, useLocation } from 'react-router-dom'


export default function App(){
const loc = useLocation()
return (
<div className="min-h-screen flex flex-col">
<header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<Link to="/" className="font-bold text-lg">Study Tracker</Link>
<nav className="flex items-center gap-4">
<Link className={navCls(loc.pathname === '/')} to="/">Home</Link>
<Link className={navCls(loc.pathname === '/join')} to="/join">Join</Link>
<Link className={navCls(loc.pathname === '/app')} to="/app">App</Link>
</nav>
</div>
</header>


<main className="flex-1">
<Outlet />
</main>


<footer className="border-t">
<div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600">
Built with React + Tailwind • Uses platform OpenAI key via env
</div>
</footer>
</div>
)
}


function navCls(active){
return `px-2 py-1 rounded ${active? 'bg-gray-900 text-white':'hover:bg-gray-100'}`
}