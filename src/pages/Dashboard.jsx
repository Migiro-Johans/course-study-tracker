import WeeklySummary from '../components/Dashboard/WeeklySummary'
import CourseProgressList from '../components/Dashboard/CourseProgressList'

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