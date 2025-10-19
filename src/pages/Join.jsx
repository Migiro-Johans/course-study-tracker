import { Link } from 'react-router-dom'

export default function Join(){
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold">Join the Study Tracker</h2>
      <p className="mt-4 text-gray-700">
        You're moments away from a personalized learning plan. The platform is already
        configured with OpenAI, so you can start adding courses immediately.
      </p>
      <Link to="/app" className="inline-block mt-6 px-5 py-3 bg-black text-white rounded-xl">Continue to App</Link>
    </div>
  )
}
