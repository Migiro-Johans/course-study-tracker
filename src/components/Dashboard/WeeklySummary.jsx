import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { weekRange } from '../../lib/date'

export default function WeeklySummary() {
  const [planned, setPlanned] = useState(0)
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const { start, end } = weekRange()
    ;(async () => {
      const { data } = await supabase
        .from('sessions')
        .select('planned_minutes, actual_minutes, done, date')
        .gte('date', start).lte('date', end)

      const p = data?.reduce((s, r) => s + (r.planned_minutes||0), 0) ?? 0
      const a = data?.filter(r=>r.done).reduce((s, r) => s + (r.actual_minutes||0), 0) ?? 0
      setPlanned(p); setActual(a)
    })()
  }, [])

  return (
    <div className="rounded-2xl border p-3">
      <div className="font-medium mb-2">This Week</div>
      <div className="text-sm">Planned: {Math.round(planned/60)}h • Actual: {Math.round(actual/60)}h</div>
      <div className="w-full bg-gray-200 h-2 rounded mt-2">
        <div className="bg-gray-800 h-2 rounded" style={{width: `${Math.min(100, (actual/(planned||1))*100)}%`}}/>
      </div>
    </div>
  )
}