import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddCourseForm from '../UI/AddCourseForm'
import CourseCard from '../UI/CourseCard'

export default function Dashboard() {
  const [courses, setCourses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('courses') || '[]')
    } catch {
      return []
    }
  })

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses))
  }, [courses])

  function addCourse(course) {
    setCourses(prev => [
      { id: crypto.randomUUID(), createdAt: Date.now(), ...course },
      ...prev,
    ])
  }

  function updateCourse(id, patch) {
    setCourses(prev =>
      prev.map(c => (c.id === id ? { ...c, ...patch } : c))
    )
  }

  function removeCourse(id) {
    setCourses(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Courses</h2>
      </div>

      <div className="mt-6">
        <AddCourseForm onAdd={addCourse} />
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length === 0 && (
          <div className="col-span-full p-6 border rounded-xl bg-white text-gray-600">
            No courses yet. Add one above.
          </div>
        )}

        {courses.map(c => (
          <CourseCard
            key={c.id}
            course={c}
            onUpdate={updateCourse}
            onRemove={removeCourse}
            onOpenPlan={() => navigate(`/app/course/${c.id}/plan`)}
            onOpenNotes={() => navigate(`/app/course/${c.id}/notes`)}
          />
        ))}
      </div>
    </div>
  )
}