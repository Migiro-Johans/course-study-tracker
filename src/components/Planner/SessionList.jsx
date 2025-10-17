import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Button from '../UI/Button'
import { weekRange } from '../../lib/date'

export default function SessionList() {
  const [rows, setRows] = useState([])

  async function load() {
    const { start, end } = weekRange()
    const { data } = await supabase
      .from('sessions')
      .select('*, courses(title)')
      .gte('date', start).lte('date', end)
      .order('date', {ascending:true})
    setRows(data ?? [])
  }
  useEffect(()=>{ load() }, [])

  async function markDone(id) {
    const actual = prompt('Actual minutes? (>=0)', '30')
    if (actual === null) return
    const { error } = await supabase.from('sessions').update({ done: true, actual_minutes: Number(actual) }).eq('id', id)
    if (error) return alert(error.message)
    load()
  }

  return (
    <div className="space-y-2">
      {rows.map(r => (
        <div key={r.id} className="rounded-xl border p-3">
          <div className="text-sm font-medium">{r.courses?.title ?? 'Course'}</div>
          <div className="text-xs text-gray-500">{r.date} • planned {r.planned_minutes} min</div>
          <div className="mt-2">
            {r.done
              ? <span className="text-xs">Done • actual {r.actual_minutes ?? 0} min</span>
              : <Button onClick={()=>markDone(r.id)}>Mark done</Button>}
          </div>
        </div>
      ))}
      {rows.length===0 && <div className="text-sm text-gray-500">No sessions planned this week.</div>}
    </div>
  )
}