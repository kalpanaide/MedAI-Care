const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/checkin', async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a supportive mental health check-in assistant. Listen to what the person shares about their mood or feelings, respond with empathy and validation, and offer simple, gentle coping suggestions. Keep responses warm, short, and non-clinical. If the person mentions anything related to self-harm, suicide, or being in crisis, gently and clearly encourage them to reach out to a mental health professional or a crisis helpline immediately, and prioritize their safety over anything else in your response. Do not diagnose any condition.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'openai/gpt-oss-20b'
    });

    const aiResponse = completion.choices[0].message.content;
    res.status(200).json({ result: aiResponse });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;