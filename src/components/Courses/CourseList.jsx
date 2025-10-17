import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import CourseForm from './CoursesForm.jsx'
import { useNavigate } from 'react-router-dom'

export default function CourseList() {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  async function load() {
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false })
    setRows(data ?? [])
  }
  useEffect(() => { load() }, [])

  async function createCourse(values) {
    const { error } = await supabase.from('courses').insert([values])
    if (error) return alert(error.message)
    setOpen(false); load()
  }
  async function del(id) {
    if (!confirm('Delete course?')) return
    const { error } = await supabase.from('courses').delete().eq('id', id)
    if (error) return alert(error.message)
    load()
  }

  return (
    <div className="space-y-3">
      <Button onClick={()=>setOpen(true)}>+ Add Course</Button>
      <div className="space-y-2">
        {rows.map(r => (
          <div key={r.id} className="rounded-xl border p-3">
            <div className="font-medium">{r.title}</div>
            <div className="text-xs text-gray-600">{r.provider} • {r.course_url}</div>
            <div className="mt-2 flex gap-2">
              <Button onClick={()=>navigate(`/courses?id=${r.id}`)}>Open</Button>
              <Button onClick={()=>del(r.id)}>Delete</Button>
            </div>
          </div>
        ))}
        {rows.length===0 && <div className="text-sm text-gray-500">No courses yet.</div>}
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="New Course" footer={null}>
        <CourseForm onSubmit={createCourse} onCancel={()=>setOpen(false)} />
      </Modal>
    </div>
  )
}