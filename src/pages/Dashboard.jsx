import WeeklySummary from '../components/Dashboard/WeeklySummary.jsx'
import CourseProgressList from '../components/Dashboard/CourseProgressList.jsx'

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <WeeklySummary />
      <div>
        <div className="font-medium mb-2">Courses</div>
        <CourseProgressList />
      </div>
    </div>
  )
}