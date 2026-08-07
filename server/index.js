const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully! ✅'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

const patientRoutes = require('./routes/patientRoutes');
app.use(express.json());
app.use('/api/patients', patientRoutes);

app.get('/', (req, res) => {
  res.send('MedAI Care Backend is running! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});