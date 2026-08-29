const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book a new appointment
router.post('/book', async (req, res) => {
  try {
    const { patient, doctor, date, time, reason } = req.body;

    const newAppointment = new Appointment({
      patient,
      doctor,
      date,
      time,
      reason
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked', appointment: newAppointment });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Get all appointments for a specific patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate('doctor', 'name specialization');

    res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Get all appointments for a specific doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient', 'name age gender phone');

    res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Update appointment status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: 'Status updated', appointment: updated });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;