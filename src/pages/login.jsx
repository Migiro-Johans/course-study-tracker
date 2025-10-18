import { useState } from 'react'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import { supabase } from '../lib/supabase'

export default function login() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  async function loginWithGoogle() {
    setError(null); setMessage(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
    if (error) setError(error.message)
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (!email.trim() || !password) {
        setError('Email and password are required.')
        return
      }

      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        // Success → Supabase session listener (ProtectedRoute) will redirect to app
        setMessage('Signed in!')
      } else {
        // SIGN UP
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin // after email confirmation (if enabled)
          }
        })
        if (error) throw error
        setMessage('Check your email to confirm your account.')
      }
    } catch (err) {
      setError(err.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  async function sendReset() {
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      if (!email.trim()) {
        setError('Enter your email above, then click “Reset password”.')
        return
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin // change to a dedicated /reset page if you add one
      })
      if (error) throw error
      setMessage('Password reset email sent. Check your inbox.')
    } catch (err) {
      setError(err.message || 'Could not send reset email.')
    } finally {
      setLoading(false)
    }
  }

  const tabBtn = (k, label) => (
    <button
      type="button"
      onClick={() => { setMode(k); setError(null); setMessage(null) }}
      className={`flex-1 px-3 py-2 text-sm rounded-xl border ${
        mode === k ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-[100dvh] grid place-items-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Welcome</h1>

        {/* Tabs */}
        <div className="flex gap-2">{tabBtn('signin','Sign in')}{tabBtn('signup','Sign up')}</div>

        {/* Email/password form */}
        <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border p-4">
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (mode==='signin' ? 'Signing in…' : 'Creating account…') : (mode==='signin' ? 'Sign in' : 'Sign up')}
          </Button>

          <div className="text-right">
            <button type="button" onClick={sendReset} className="text-xs underline text-gray-600">
              Reset password
            </button>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {message && <div className="text-sm text-green-600">{message}</div>}
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-500">or</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Google OAuth */}
        <Button onClick={loginWithGoogle} className="w-full">
          Continue with Google
        </Button>

        <p className="text-xs text-gray-500">
          By continuing, you agree to our Terms and acknowledge our Privacy Policy.
        </p>
      </div>
    </div>
  )
}