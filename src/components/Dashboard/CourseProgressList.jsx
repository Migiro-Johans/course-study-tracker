import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase.js'

export default function CourseProgressList() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data: courses } = await supabase.from('courses').select('id,title,manual_progress')
      if (!courses) return setRows([])
      const { data: lessons } = await supabase.from('lessons').select('id,course_id,done')
      const map = courses.map(c => {
        const l = lessons?.filter(x=>x.course_id===c.id) ?? []
        const done = l.filter(x=>x.done).length
        const total = l.length || 1
        const auto = Math.round((done/total)*100)
        const pct = (c.manual_progress ?? auto)
        return { id:c.id, title:c.title, progress:pct }
      })
      setRows(map)
    })()
  }, [])

  return (
    <div className="space-y-2">
      {rows.map(r => (
        <div key={r.id} className="rounded-xl border p-3">
          <div className="text-sm mb-1">{r.title}</div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div className="bg-gray-800 h-2 rounded" style={{width: `${r.progress}%`}}/>
          </div>
          <div className="text-xs mt-1">{r.progress}%</div>
        </div>
      ))}
      {rows.length===0 && <div className="text-sm text-gray-500">No courses yet.</div>}
    </div>
  )
}