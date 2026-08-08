const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { name, age, gender, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newPatient = new Patient({
      name,
      age,
      gender,
      phone,
      email,
      password: hashedPassword
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient registered', patient: newPatient });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});
// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', patient });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});
module.exports = router;