const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully! ✅'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const aiRoutes = require('./routes/aiRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const healthRecordRoutes = require('./routes/healthRecordRoutes');
const mentalHealthRoutes = require('./routes/mentalHealthRoutes');

app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/health-records', healthRecordRoutes);
app.use('/api/mental-health', mentalHealthRoutes);

app.get('/', (req, res) => {
  res.send('MedAI Care Backend is running! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});