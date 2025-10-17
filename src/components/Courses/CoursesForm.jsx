import { useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { validate, required, positiveInt } from '../../lib/validators'

export default function CourseForm({ initial={}, onSubmit, onCancel }) {
  const [values, setValues] = useState({
    title: initial.title ?? '',
    provider: initial.provider ?? '',
    course_url: initial.course_url ?? '',
    goal_hours: initial.goal_hours ?? 0
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setValues(v => ({...v, [name]: name==='goal_hours' ? Number(value) : value}))
  }

  function submit() {
    const errs = validate({
      title: [values.title, required],
      goal_hours: [values.goal_hours, v=> (v>=0?null:'Must be >= 0')]
    })
    setErrors(errs)
    if (Object.keys(errs).length) return
    onSubmit?.(values)
  }

  return (
    <div className="space-y-3">
      <Input label="Title" name="title" value={values.title} onChange={handleChange} error={errors.title}/>
      <Input label="Provider" name="provider" value={values.provider} onChange={handleChange}/>
      <Input label="Course URL" name="course_url" value={values.course_url} onChange={handleChange}/>
      <Input label="Goal hours" name="goal_hours" type="number" value={values.goal_hours} onChange={handleChange}/>
      <div className="flex gap-2">
        <Button onClick={submit}>Save</Button>
        <Button className="border-0 underline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}