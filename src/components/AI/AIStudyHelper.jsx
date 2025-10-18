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
      // Prefer calling a serverless route when deployed; fall back to local mock during dev
      let json
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        try {
          const res = await fetch('/api/ai/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
          })
          json = await res.json()
        } catch (err) {
          console.debug('AI summarize fallback:', err)
          json = { summary: 'Summary unavailable (offline). Using mock.' }
        }
      } else {
        json = { summary: 'Mock summary...' }
      }
      setResult(json)
      // Best-effort persistence; ignore errors in local dev without Supabase
      try {
        await supabase.from('ai_notes').insert([{ note_type:'summary', source_text:text, result_json: json }])
      } catch (e) {
        console.debug('Skipping ai_notes insert in dev:', e)
      }
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