const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Add a new medicine reminder
router.post('/add', async (req, res) => {
  try {
    const { patient, medicineName, dosage, time, frequency } = req.body;

    const newMedicine = new Medicine({
      patient,
      medicineName,
      dosage,
      time,
      frequency
    });

    await newMedicine.save();
    res.status(201).json({ message: 'Medicine reminder added', medicine: newMedicine });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Get all medicine reminders for a patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const medicines = await Medicine.find({ patient: req.params.patientId });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Delete a medicine reminder
router.delete('/:id', async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Medicine reminder deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;