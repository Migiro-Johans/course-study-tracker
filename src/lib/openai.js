

export async function callResponses({ instructions, input, json = false }) {
const key = import.meta.env.VITE_OPENAI_API_KEY
if (!key) throw new Error('Missing VITE_OPENAI_API_KEY. Add it to .env.local or the hosting env.')


const body = {
model: 'gpt-4.1-mini',
instructions,
input,
}


// NEW: Responses API moved from response_format to text.format
if (json) body.text = { format: { type: 'json_object' } }


const res = await fetch('https://api.openai.com/v1/responses', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${key}`
},
body: JSON.stringify(body)
})


if (!res.ok) {
const text = await res.text()
throw new Error(`OpenAI error (${res.status}): ${text}`)
}


const data = await res.json()
// Normalize best-effort
const text = data.output_text || data.output?.[0]?.content?.[0]?.text || JSON.stringify(data)
return text
}