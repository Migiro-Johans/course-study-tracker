import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body || {};
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Missing 'text' in body" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Responses API (simplified)
    const resp = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: `Summarize the following study notes in concise bullet points:\n\n${text}`,
        },
      ],
      temperature: 0.3,
    });

    // Try to extract plain text summary from the response
    const summary =
      resp.output_text?.trim() ||
      resp.output?.[0]?.content?.[0]?.text?.trim() ||
      "No summary produced.";

    return res.status(200).json({ summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "AI summarization failed" });
  }
}