import SessionForm from '../components/Planner/SessionForm.jsx'
import SessionList from '../components/Planner/SessionList.jsx'

export default function Planner() {
  return (
    <div className="space-y-4">
      <SessionForm onCreated={()=>{}} />
      <SessionList />
    </div>
  )
}