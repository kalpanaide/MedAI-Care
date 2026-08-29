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
          content: 'You are a warm, caring mental health check-in companion. Listen to what the person shares, respond with genuine empathy and validation, and offer 1-2 simple, gentle coping suggestions written as flowing sentences, not as a numbered or bulleted list. Use a warm, friendly tone and include 1-2 fitting emojis naturally within the sentences (like 🌱, 💙, 🤗, ☀️), never as list markers or numbering. Keep responses short, conversational, and non-clinical. If the person mentions anything related to self-harm, suicide, or being in crisis, gently and clearly encourage them to reach out to a mental health professional or a crisis helpline immediately, and prioritize their safety over anything else. Do not diagnose any condition.'
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