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
          content: 'You are a medical assistant AI. Based on symptoms given, suggest possible causes, severity level (Low/Medium/High), and whether the person should see a doctor. Keep the response short and clear. Always add a disclaimer that this is not a substitute for professional medical advice.'
        },
        {
          role: 'user',
          content: symptoms
        }
      ],
      model: 'llama-3.3-70b-versatile'
    });

    const aiResponse = completion.choices[0].message.content;
    res.status(200).json({ result: aiResponse });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;