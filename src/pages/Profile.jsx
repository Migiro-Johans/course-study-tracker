import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  // --- persisted profile (name + avatar) ---
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('profile') || '{}') } catch { return {} }
  })

  // --- persisted courses (for stats + backlog + reschedule) ---
  const [courses, setCourses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('courses') || '[]') } catch { return [] }
  })

  // persist when either changes
  useEffect(() => { localStorage.setItem('profile', JSON.stringify(profile)) }, [profile])
  useEffect(() => { localStorage.setItem('courses', JSON.stringify(courses)) }, [courses])

  // profile handlers
  function onNameChange(e) { setProfile(p => ({ ...p, name: e.target.value })) }
  async function onAvatarChange(e) {
    const file = e.target.files?.[0]; if (!file) return
    const dataUrl = await fileToDataURL(file)
    setProfile(p => ({ ...p, avatar: dataUrl }))
  }

  // derived data
  const stats = useMemo(() => summarize(courses), [courses])
  const backlog = useMemo(() => buildBacklog(courses), [courses])

  // reschedule a backlog session into current or next week
  function reschedule(item, target) {
    // item: { courseId, weekIdx, sessionIdx, ... }
    setCourses(prev =>
      prev.map(c => {
        if (c.id !== item.courseId) return c

        // robust clone (structuredClone if available, else JSON fallback)
        const next = typeof structuredClone === 'function'
          ? structuredClone(c)
          : JSON.parse(JSON.stringify(c))

        const fromWeek = next.plan?.weekly_plan?.[item.weekIdx]
        if (!fromWeek) return c

        const session = fromWeek.sessions?.[item.sessionIdx]
        if (!session) return c

        // remove from old position
        fromWeek.sessions.splice(item.sessionIdx, 1)

        // pick target week index based on weeks elapsed since course createdAt
        const now = Date.now()
        const created = c.createdAt || now
        const weeksElapsed = Math.max(1, Math.floor((now - created) / (7 * 24 * 60 * 60 * 1000)) + 1)
        let targetIdx = target === 'current' ? weeksElapsed - 1 : weeksElapsed // zero-based

        if (targetIdx < 0) targetIdx = 0
        if (!next.plan.weekly_plan[targetIdx]) {
          next.plan.weekly_plan[targetIdx] = { week: targetIdx + 1, sessions: [] }
        }

        // push to target week end and reset status
        next.plan.weekly_plan[targetIdx].sessions.push({ ...session, status: 'not_started' })
        return next
      })
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Link to="/app" className="px-3 py-2 border rounded-md">Back to App</Link>
      </div>

      {/* Profile Card */}
      <section className="p-4 border rounded-xl bg-white flex items-center gap-4">
        <div>
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 grid place-items-center text-gray-500 border">
              IMG
            </div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Your name</label>
          <input
            className="mt-1 w-full max-w-md border rounded-md px-3 py-2"
            value={profile.name || ''}
            onChange={onNameChange}
            placeholder="Enter your name"
          />
          <div className="mt-3">
            <input type="file" accept="image/*" onChange={onAvatarChange} />
          </div>
        </div>
      </section>

      {/* Progress Summary */}
      <section className="p-4 border rounded-xl bg-white">
        <h2 className="font-semibold mb-3">Progress Summary</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <SummaryCard label="Completed" value={stats.completed} />
          <SummaryCard label="In progress" value={stats.in_progress} />
          <SummaryCard label="Not started" value={stats.not_started} />
        </div>
      </section>

      {/* Backlog */}
      <section className="p-4 border rounded-xl bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Backlog (missed sessions)</h2>
          <p className="text-sm text-gray-600">
            Sessions from earlier weeks not marked as completed.
          </p>
        </div>

        {backlog.length === 0 ? (
          <div className="p-3 text-sm text-gray-600">No backlog — nice work!</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2 border-b">Course</th>
                  <th className="text-left p-2 border-b">Week</th>
                  <th className="text-left p-2 border-b">Day</th>
                  <th className="text-left p-2 border-b">Topic</th>
                  <th className="text-left p-2 border-b">Minutes</th>
                  <th className="text-left p-2 border-b">Status</th>
                  <th className="text-left p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {backlog.map((b, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 whitespace-nowrap">{b.courseTitle}</td>
                    <td className="p-2">{b.week}</td>
                    <td className="p-2 whitespace-nowrap">{b.session.day}</td>
                    <td className="p-2">{b.session.topic}</td>
                    <td className="p-2 whitespace-nowrap">{b.session.minutes}</td>
                    <td className="p-2 whitespace-nowrap capitalize">
                      {(b.session.status || 'not_started').replace('_', ' ')}
                    </td>
                    <td className="p-2 whitespace-nowrap flex gap-2">
                      <button
                        className="px-3 py-1.5 rounded-md border"
                        onClick={() => reschedule(b, 'current')}
                      >
                        Reschedule to current week
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-md border"
                        onClick={() => reschedule(b, 'next')}
                      >
                        Reschedule to next week
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

/* ---------- helpers ---------- */

function SummaryCard({ label, value }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

function summarize(courses) {
  const tally = { completed: 0, in_progress: 0, not_started: 0 }
  for (const c of courses) {
    const weeks = c?.plan?.weekly_plan || []
    for (const w of weeks) {
      for (const s of w.sessions || []) {
        const st = s.status || 'not_started'
        if (st === 'completed') tally.completed++
        else if (st === 'in_progress') tally.in_progress++
        else tally.not_started++
      }
    }
  }
  return tally
}

function buildBacklog(courses) {
  const list = []
  const now = Date.now()
  for (const c of courses) {
    const weeks = c?.plan?.weekly_plan || []
    if (!weeks.length) continue

    const created = c.createdAt || now
    const weeksElapsed = Math.max(1, Math.floor((now - created) / (7 * 24 * 60 * 60 * 1000)) + 1)

    weeks.forEach((w, wi) => {
      const weekNumber = w.week ?? (wi + 1)
      if (weekNumber < weeksElapsed) {
        (w.sessions || []).forEach((s, si) => {
          if (s.status !== 'completed') {
            list.push({
              courseId: c.id,
              courseTitle: c.title,
              week: weekNumber,
              session: s,
              weekIdx: wi,
              sessionIdx: si,
            })
          }
        })
      }
    })
  }
  return list
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}