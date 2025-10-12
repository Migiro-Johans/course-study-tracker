import { useEffect, useState } from 'react'
export default function Toast({ text, showFor=2000, onDone }) {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    const t = setTimeout(()=>{ setOpen(false); onDone?.() }, showFor)
    return ()=> clearTimeout(t)
  }, [])
  if (!open) return null
  return <div className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-2 rounded-lg">{text}</div>
}
