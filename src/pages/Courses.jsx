import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import CourseList from '../components/Courses/CourseList'
import CourseDetail from '../components/Courses/CourseDetail'

export default function Courses() {
  const params = new URLSearchParams(useLocation().search)
  const id = useMemo(()=> params.get('id'), [params])
  return (
    <div className="space-y-4">
      {!id && <CourseList />}
      {id && <CourseDetail id={id} />}
    </div>
  )
}
