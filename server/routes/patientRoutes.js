const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const resend = require('../emailConfig');

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

// Forgot password - send reset link
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    patient.resetToken = token;
    patient.resetTokenExpiry = Date.now() + 3600000;
    await patient.save();

    const resetLink = `https://med-ai-care-roan.vercel.app/?resetToken=${token}`;

    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: patient.email,
      subject: 'MedAI Care - Password Reset',
      html: `<p>Hi ${patient.name},</p>
             <p>Click the link below to reset your password. This link expires in 1 hour.</p>
             <a href="${resetLink}">${resetLink}</a>`
    });

      if (emailResult.error) {
      return res.status(500).json({ message: 'Unable to send reset email at this time. Please try again later.' });
    }

    res.status(200).json({ message: 'Reset link sent to your email' });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Reset password using token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const patient = await Patient.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!patient) {
      return res.status(400).json({ message: 'Reset link is invalid or expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    patient.password = hashedPassword;
    patient.resetToken = undefined;
    patient.resetTokenExpiry = undefined;
    await patient.save();

    res.status(200).json({ message: 'Password reset successful' });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Get all patients (for doctors to browse)
router.get('/all', async (req, res) => {
  try {
    const patients = await Patient.find().select('name age gender');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;