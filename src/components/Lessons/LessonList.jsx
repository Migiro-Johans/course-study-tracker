import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase.js'
import Button from '../UI/Button.jsx'
import Input from '../UI/Input.jsx'
import Modal from '../UI/Modal.jsx'
import { validate, required, positiveInt } from '../../lib/validators.js'

export default function LessonList({ courseId }) {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title:'', lesson_url:'', est_minutes:30 })
  const [errors, setErrors] = useState({})

  async function load() {
    const { data } = await supabase.from('lessons').select('*').eq('course_id', courseId).order('created_at', { ascending: true })
    setRows(data ?? [])
  }
  useEffect(()=>{ if(courseId) load() }, [courseId])

  async function toggle(id, done) {
    await supabase.from('lessons').update({ done: !done }).eq('id', id)
    load()
  }
  async function add() {
    const errs = validate({
      title: [form.title, required],
      est_minutes: [Number(form.est_minutes), positiveInt]
    })
    setErrors(errs); if(Object.keys(errs).length) return
    const { error } = await supabase.from('lessons').insert([{ ...form, course_id: courseId }])
    if (error) return alert(error.message)
    setOpen(false); setForm({ title:'', lesson_url:'', est_minutes:30 }); load()
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="font-medium">Lessons</div>
        <Button onClick={()=>setOpen(true)}>+ Add Lesson</Button>
      </div>
      <div className="space-y-2">
        {rows.map(r => (
          <label key={r.id} className="flex items-center gap-3 rounded-xl border p-3">
            <input type="checkbox" checked={r.done} onChange={()=>toggle(r.id, r.done)} />
            <div className="flex-1">
              <div className="text-sm">{r.title}</div>
              {r.lesson_url && <a className="text-xs text-blue-600 underline" href={r.lesson_url} target="_blank">Open link</a>}
              <div className="text-xs text-gray-500">{r.est_minutes} min</div>
            </div>
          </label>
        ))}
        {rows.length===0 && <div className="text-sm text-gray-500">No lessons yet.</div>}
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Add Lesson" footer={null}>
        <div className="space-y-3">
          <Input label="Title" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))} error={errors.title}/>
          <Input label="Lesson URL (optional)" value={form.lesson_url} onChange={e=>setForm(f=>({...f, lesson_url:e.target.value}))}/>
          <Input label="Estimated minutes" type="number" value={form.est_minutes} onChange={e=>setForm(f=>({...f, est_minutes:e.target.value}))} error={errors.est_minutes}/>
          <Button onClick={add}>Save</Button>
        </div>
      </Modal>
    </div>
  )
}