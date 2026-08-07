const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { name, age, gender, phone, email, password } = req.body;

    const newPatient = new Patient({
      name,
      age,
      gender,
      phone,
      email,
      password
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient registered', patient: newPatient });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;