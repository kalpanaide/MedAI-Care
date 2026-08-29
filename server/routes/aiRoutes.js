const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/symptom-check', async (req, res) => {
  try {
    const { symptoms } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a medical assistant AI. Based on the symptoms given, respond with ONLY a valid JSON object, no markdown, no extra text, in this exact format: {"cause": "short possible cause, under 15 words", "severity": "Low" or "Medium" or "High", "advice": "short practical advice, under 20 words"}'
        },
        {
          role: 'user',
          content: symptoms
        }
      ],
      model: 'openai/gpt-oss-20b'
    });

    const rawText = completion.choices[0].message.content;
    let parsed;

    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : rawText);
    } catch (parseError) {
      parsed = { cause: rawText, severity: 'Medium', advice: 'Please consult a doctor for accurate guidance.' };
    }

    res.status(200).json({ result: parsed });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;