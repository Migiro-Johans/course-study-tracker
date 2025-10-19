import { useMemo, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function Planner() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [courses, setCourses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('courses') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses))
  }, [courses])

  const course = useMemo(() => courses.find(c => c.id === id), [courses, id])

  function setStatus(weekIdx, sessionIdx, status) {
    setCourses(prev =>
      prev.map(c => {
        if (c.id !== id) return c
        const next = structuredClone(c)
        next.plan.weekly_plan[weekIdx].sessions[sessionIdx].status = status
        return next
      })
    )
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-600">Course not found.</p>
        <button
          onClick={() => navigate('/app')}
          className="mt-4 px-4 py-2 border rounded-md"
        >
          Back to App
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Planner — {course.title}</h2>
        <Link to="/app" className="px-3 py-2 border rounded-md">
          Back
        </Link>
      </div>

      {!course.plan && (
        <div className="p-4 border rounded-lg bg-white">
          No plan yet. Generate one from the Dashboard.
        </div>
      )}

      {course.plan &&
        course.plan.weekly_plan?.map((w, wi) => (
          <div key={wi} className="mb-6">
            <h3 className="font-semibold mb-2">Week {w.week ?? wi + 1}</h3>
            <div className="overflow-auto border rounded-lg bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 border-b">Day</th>
                    <th className="text-left p-3 border-b">Topic</th>
                    <th className="text-left p-3 border-b">Minutes</th>
                    <th className="text-left p-3 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {w.sessions.map((s, si) => (
                    <tr key={si} className="border-b">
                      <td className="p-3 whitespace-nowrap">{s.day}</td>
                      <td className="p-3">{s.topic}</td>
                      <td className="p-3 whitespace-nowrap">{s.minutes}</td>
                      <td className="p-3">
                        <select
                          className="border rounded-md px-2 py-1"
                          value={s.status || 'not_started'}
                          onChange={e => setStatus(wi, si, e.target.value)}
                        >
                          <option value="not_started">Not started</option>
                          <option value="in_progress">In progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  )
}