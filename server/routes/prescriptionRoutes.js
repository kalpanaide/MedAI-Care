const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Prescription = require('../models/Prescription');

// Doctor creates a new prescription
router.post('/create', async (req, res) => {
  try {
    const { patient, doctor, medicines, notes } = req.body;

    const newPrescription = new Prescription({
      patient,
      doctor,
      medicines,
      notes
    });

    await newPrescription.save();

    const qrData = `Prescription ID: ${newPrescription._id}`;
    const qrCodeImage = await QRCode.toDataURL(qrData);

    res.status(201).json({
      message: 'Prescription created',
      prescription: newPrescription,
      qrCode: qrCodeImage
    });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Verify a prescription by ID (public verification)
router.get('/verify/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patient', 'name age gender')
      .populate('doctor', 'name specialization');

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found. This may not be genuine.' });
    }

    res.status(200).json({ message: 'Prescription verified', prescription });

  } catch (error) {
    res.status(500).json({ message: 'Invalid prescription ID', error: error.message });
  }
});

// Get all prescriptions for a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctor: req.params.doctorId })
      .populate('patient', 'name age gender');
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Get all prescriptions for a patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.params.patientId })
      .populate('doctor', 'name specialization');
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;