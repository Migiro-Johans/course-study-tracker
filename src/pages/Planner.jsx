import SessionForm from '../components/Planner/SessionForm'
import SessionList from '../components/Planner/SessionList'

export default function Planner() {
  return (
    <div className="space-y-4">
      <SessionForm onCreated={()=>{}} />
      <SessionList />
    </div>
  )
}