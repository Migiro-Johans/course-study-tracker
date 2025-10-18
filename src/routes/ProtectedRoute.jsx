import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined) // undefined = loading
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (cancelled) return
        if (error) setError(error)
        setSession(data?.session ?? null)
      } catch (e) {
        if (!cancelled) setError(e), setSession(null)
      }
    })()
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!cancelled) setSession(s ?? null)
    })
    return () => { cancelled = true; sub.subscription.unsubscribe() }
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-[100dvh] grid place-items-center text-sm text-gray-500 bg-white">
        Loading…
      </div>
    )
  }
  if (error) {
    return <div className="p-4 text-sm text-red-600">Auth error: {String(error.message || error)}</div>
  }
  if (!session) return <Navigate to="/login" replace />
  return children
}
