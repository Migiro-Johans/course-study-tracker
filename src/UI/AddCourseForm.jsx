import { useState } from 'react'


export default function AddCourseForm({ onAdd }){
const [title,setTitle] = useState("")
const [provider,setProvider] = useState("")
const [url,setUrl] = useState("")


function submit(e){
e.preventDefault()
if(!title.trim()) return
onAdd({ title:title.trim(), provider:provider.trim(), url:url.trim(), plan:null })
setTitle(""); setProvider(""); setUrl("")
}


return (
<form onSubmit={submit} className="bg-white border rounded-xl p-4 flex flex-col md:flex-row gap-3">
<input className="border rounded-md px-3 py-2 flex-1" placeholder="Course title (e.g., React for Beginners)" value={title} onChange={e=>setTitle(e.target.value)} />
<input className="border rounded-md px-3 py-2 md:w-48" placeholder="Provider (Udemy/ALX/etc.)" value={provider} onChange={e=>setProvider(e.target.value)} />
<input className="border rounded-md px-3 py-2 md:w-64" placeholder="Course URL (optional)" value={url} onChange={e=>setUrl(e.target.value)} />
<button className="px-4 py-2 bg-black text-white rounded-md">Add Course</button>
</form>
)
}