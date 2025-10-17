import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { validate, required, positiveInt } from '../../lib/validators'
import { toISODate } from '../../lib/date'

export default function SessionForm({ onCreated }) {
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({
    course_id: '',
    lesson_id: null,
    date: toISODate(),
    planned_minutes: 30
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    supabase.from('courses').select('id,title').then(({ data }) => setCourses(data ?? []))
  }, [])

  async function submit() {
    const errs = validate({
      course_id: [form.course_id, required],
      date: [form.date, required],
      planned_minutes: [Number(form.planned_minutes), positiveInt]
    })
    setErrors(errs); if(Object.keys(errs).length) return
    const { error } = await supabase.from('sessions').insert([form])
    if (error) return alert(error.message)
    onCreated?.()
    setForm(f => ({ ...f, planned_minutes: 30 }))
  }

  return (
    <div className="space-y-3 rounded-xl border p-3">
      <div className="font-medium">Plan Session</div>
      <label className="block text-sm">
        Course
        <select className="w-full rounded-xl border px-3 py-2 text-sm"
                value={form.course_id} onChange={e=>setForm(f=>({...f, course_id:e.target.value}))}>
          <option value="">Select course</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        {errors.course_id && <div className="text-xs text-red-600">{errors.course_id}</div>}
      </label>
      <Input label="Date" type="date" value={form.date} onChange={e=>setForm(f=>({...f, date:e.target.value}))} error={errors.date}/>
      <Input label="Planned minutes" type="number" value={form.planned_minutes} onChange={e=>setForm(f=>({...f, planned_minutes:e.target.value}))} error={errors.planned_minutes}/>
      <Button onClick={submit}>Add Session</Button>
    </div>
  )
}