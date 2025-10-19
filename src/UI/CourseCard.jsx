import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { callResponses } from '../lib/openai'

export default function CourseCard({
  course,
  onUpdate,
  onRemove,
  onOpenPlan,   // from Dashboard (kept for buttons)
  onOpenNotes,  // from Dashboard (kept for buttons)
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [askPreference, setAskPreference] = useState(false)
  const navigate = useNavigate() // used for auto-redirect after generate

  async function generatePlan(preference) {
    setLoading(true)
    setError('')
    try {
      const prompt = buildPlannerPrompt(course, preference)
      const json = await callResponses({
        instructions: 'You are an expert curriculum planner. Return strict JSON.',
        input: [{ role: 'user', content: [{ type: 'input_text', text: prompt }] }],
        json: true, // Responses API uses text.format under the hood (set in openai.js)
      })

      const plan = JSON.parse(json)
      // Basic structure validation to guard against malformed output
      if (!plan || typeof plan !== 'object' || !Array.isArray(plan.weekly_plan)) {
        throw new Error('AI returned an unexpected format. Please try again.')
      }

      onUpdate(course.id, { plan })
      setAskPreference(false)

      // ✅ Auto-redirect to Planner after successful generation
      navigate(`/app/course/${course.id}/plan`)
    } catch (e) {
      setError(e.message || 'Failed to generate plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border rounded-xl bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-lg">{course.title}</h3>
          <p className="text-sm text-gray-600">{course.provider || 'Provider not set'}</p>
          {course.url && (
            <a
              href={course.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 underline"
            >
              Course link
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          {!course.plan ? (
            <button
              disabled={loading}
              onClick={() => generatePlan()}
              className="px-3 py-1.5 rounded-md bg-black text-white disabled:opacity-50"
            >
              {loading ? 'Generating…' : 'Generate Plan'}
            </button>
          ) : (
            <>
              <button
                disabled={loading}
                onClick={() => setAskPreference(v => !v)}
                className="px-3 py-1.5 rounded-md bg-black text-white disabled:opacity-50"
              >
                {askPreference ? 'Choose Duration' : 'Regenerate Plan'}
              </button>
              <button onClick={() => onRemove(course.id)} className="px-3 py-1.5 rounded-md border">
                Remove
              </button>
              {/* Visible only when a plan exists */}
              <button onClick={onOpenPlan} className="px-3 py-1.5 rounded-md border">
                Open Planner
              </button>
              <button onClick={onOpenNotes} className="px-3 py-1.5 rounded-md border">
                Notes & Flashcards
              </button>
            </>
          )}
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {askPreference && (
        <div
          className="mt-3 p-3 border rounded-lg bg-yellow-50"
          role="group"
          aria-label="Regenerate options"
        >
          <p className="text-sm font-medium mb-2">How fast should we finish this course?</p>
          <div className="flex flex-wrap gap-2">
            <button
              disabled={loading}
              onClick={() => generatePlan('shorter')}
              className="px-3 py-1.5 rounded-md border"
            >
              Shorter period
            </button>
            <button
              disabled={loading}
              onClick={() => generatePlan('same')}
              className="px-3 py-1.5 rounded-md border"
            >
              Keep similar
            </button>
            <button
              disabled={loading}
              onClick={() => generatePlan('longer')}
              className="px-3 py-1.5 rounded-md border"
            >
              Longer period
            </button>
          </div>
        </div>
      )}

      {/* Compact preview (helps users confirm content before opening full pages) */}
      {course.plan && (
        <div className="mt-4 space-y-4">
          <Section title="Summary" body={course.plan.summary} />

          <Section title="Lessons">
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {(course.plan.lessons || []).slice(0, 6).map((l, i) => (
                <li key={i}>
                  {l.title} — {l.estimated_minutes} min
                </li>
              ))}
              {Array.isArray(course.plan.lessons) && course.plan.lessons.length > 6 && (
                <li className="text-gray-500 italic">…and more</li>
              )}
            </ul>
          </Section>

          <Section title="Weekly Planner (preview)">
            <div className="grid md:grid-cols-2 gap-3">
              {course.plan.weekly_plan?.slice(0, 2).map((w, i) => (
                <div key={i} className="p-3 rounded-lg border bg-gray-50">
                  <div className="font-medium">Week {w.week ?? i + 1}</div>
                  <ul className="mt-2 space-y-1 text-sm">
                    {w.sessions.slice(0, 3).map((s, idx) => (
                      <li key={idx}>
                        <span className="text-gray-500">{s.day}:</span> {s.topic} — {s.minutes} min
                      </li>
                    ))}
                    {w.sessions.length > 3 && (
                      <li className="text-gray-500 italic">…more sessions</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button onClick={onOpenPlan} className="px-3 py-1.5 rounded-md border">
                Open full Planner
              </button>
            </div>
          </Section>
        </div>
      )}
    </div>
  )
}

function Section({ title, body, children }) {
  return (
    <div>
      <h4 className="font-semibold">{title}</h4>
      {body && <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{body}</p>}
      {children}
    </div>
  )
}

function buildPlannerPrompt(course, preference) {
  // preference: 'shorter' | 'same' | 'longer' | undefined
  const guidance =
    preference === 'shorter'
      ? 'Prefer fewer weeks (compress schedule slightly) while keeping daily load reasonable.'
      : preference === 'longer'
      ? 'Prefer more weeks (spread content out) to reduce daily load.'
      : 'Choose the number of weeks based on the typical scope of this course.'

  return `Create a compact learning plan for the course below.
Return JSON with keys:
- summary (string),
- lessons (array of {title, estimated_minutes}),
- flash_questions (array of strings),
- weekly_plan (array of {week:int, sessions: array of {day:string, topic:string, minutes:int}}).
Guidelines:
- Aim for 8–14 lessons total.
- Choose weeks dynamically based on course size. ${guidance}
- 4–6 sessions per week; 45–90 minutes per session.
- Alternate between NEW concepts and REVIEW days.
- Ensure the weekly_plan covers all lessons sensibly.

Course Title: ${course.title}
Provider: ${course.provider || 'Unknown'}
Context: Beginner-friendly. Alternate between new concepts and review days.
JSON ONLY.`
}