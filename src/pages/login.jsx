import Button from '../components/UI/Button'
import { supabase } from '../lib/supabase'

export default function Login() {
  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
    if (error) alert(error.message)
  }

  return (
    <div className="min-h-[100dvh] grid place-items-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-gray-600">Use your Google account to continue.</p>
        <Button onClick={loginWithGoogle} className="w-full">Continue with Google</Button>
      </div>
    </div>
  )
}