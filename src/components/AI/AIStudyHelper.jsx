import { useState } from 'react'
import Button from '../UI/Button'
import { supabase } from '../../lib/supabase'

export default function AIStudyHelper() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function summarize() {
    if (!text.trim()) return
    setLoading(true)
    try {
      // Replace with your API route call (Vercel serverless)
      // const res = await fetch('/api/ai/summarize', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text }) })
      // const json = await res.json()
      const json = { summary: 'Mock summary...' } // placeholder
      setResult(json)
      await supabase.from('ai_notes').insert([{ note_type:'summary', source_text:text, result_json: json }])
    } finally { setLoading(false) }
  }

  return (
    <div className="space-y-3">
      <textarea className="w-full min-h-40 rounded-xl border p-3 text-sm"
                placeholder="Paste notes here…" value={text} onChange={e=>setText(e.target.value)} />
      <Button onClick={summarize} disabled={loading}>{loading?'Working…':'Summarize'}</Button>
      {result && <pre className="text-xs bg-gray-100 p-3 rounded-xl overflow-auto">{JSON.stringify(result,null,2)}</pre>}
    </div>
  )
}