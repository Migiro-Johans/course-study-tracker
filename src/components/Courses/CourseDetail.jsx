import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Input from '../UI/Input'
import Button from '../UI/Button'
import LessonList from '../Lessons/LessonList'

export default function CourseDetail({ id }) {
  const [course, setCourse] = useState(null)

  async function load() {
    const { data } = await supabase.from('courses').select('*').eq('id', id).maybeSingle()
    setCourse(data)
  }
  useEffect(()=>{ if(id) load() }, [id])

  async function saveManualProgress(p) {
    await supabase.from('courses').update({ manual_progress: p }).eq('id', id)
    load()
  }

  if (!course) return <div className="text-sm text-gray-500">Select a course.</div>

  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-3">
        <div className="font-medium">{course.title}</div>
        {course.course_url && <a className="text-xs text-blue-600 underline" href={course.course_url} target="_blank">Open course</a>}
        <div className="mt-2 flex items-end gap-2">
          <Input label="Manual progress %" type="number"
                 value={course.manual_progress ?? ''} onChange={e=>saveManualProgress(Number(e.target.value))}/>
          <div className="text-xs text-gray-500">Optional override</div>
        </div>
      </div>
      <LessonList courseId={id} />
    </div>
  )
}