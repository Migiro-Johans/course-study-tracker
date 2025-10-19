import { useMemo, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { callResponses } from '../lib/openai'

export default function Notes() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [courses, setCourses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('courses') || '[]')
    } catch {
      return []
    }
  })
  const [checking, setChecking] = useState(false)
  const [answers, setAnswers] = useState(null)

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses))
  }, [courses])

  const course = useMemo(() => courses.find(c => c.id === id), [courses, id])
  const [userAns, setUserAns] = useState(() =>
    (course?.plan?.flash_questions || []).map(() => '')
  )

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

  async function revealAnswers() {
    setChecking(true)
    try {
      const prompt = `Given the summary and flash questions, provide concise correct answers as JSON array of strings in order.
Summary: ${course.plan?.summary || ''}
Questions: ${(course.plan?.flash_questions || []).join(' | ')}`

      const json = await callResponses({
        instructions: 'Return strict JSON array of answers',
        input: [{ role: 'user', content: [{ type: 'input_text', text: prompt }] }],
        json: true,
      })

      const arr = JSON.parse(json)
      setAnswers(Array.isArray(arr) ? arr : null)
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notes — {course.title}</h2>
        <Link to="/app" className="px-3 py-2 border rounded-md">
          Back
        </Link>
      </div>

      {!course.plan && (
        <div className="p-4 border rounded-lg bg-white">
          No plan yet. Generate one from the Dashboard.
        </div>
      )}

      {course.plan && (
        <>
          <section className="p-4 border rounded-lg bg-white">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {course.plan.summary}
            </p>
          </section>

          <section className="p-4 border rounded-lg bg-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Flash Questions</h3>
              <button
                disabled={checking}
                onClick={revealAnswers}
                className="px-3 py-1.5 rounded-md border"
              >
                {checking ? 'Getting answers…' : 'Reveal suggested answers'}
              </button>
            </div>

            <ol className="space-y-3 list-decimal pl-5">
              {(course.plan.flash_questions || []).map((q, i) => (
                <li key={i}>
                  <div className="text-sm font-medium">{q}</div>
                  <input
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    placeholder="Your answer"
                    value={userAns[i]}
                    onChange={e => {
                      const v = [...userAns]
                      v[i] = e.target.value
                      setUserAns(v)
                    }}
                  />
                  {answers && (
                    <p className="mt-1 text-xs text-gray-600">
                      Suggested:{' '}
                      <span className="font-medium">
                        {answers[i] ?? '—'}
                      </span>
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
    </div>
  )
}