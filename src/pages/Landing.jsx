import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Plan your learning. 
            <span className="block text-gray-500">Track your progress.</span>
          </h1>
          <p className="mt-5 text-lg text-gray-700">
            Add any course (Udemy, ALX, Coursera, YouTube). Our AI drafts lessons, summary notes,
            flash questions, and a weekly study plan tailored to your schedule.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/join" className="px-5 py-3 rounded-xl bg-black text-white">Join</Link>
            <Link to="/app" className="px-5 py-3 rounded-xl border">Open App</Link>
          </div>
        
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-lg">How it works</h3>
          <ol className="mt-4 space-y-2 text-sm">
            <li>1) Leverage Artificial intelligence to plan your learning(no user key input)</li>
            <li>2) Add a course name + provider</li>
            <li>3) Click "Generate Plan" to create lessons, summaries & a weekly planner</li>
          </ol>
        </div>
      </div>
    </section>
  )
}