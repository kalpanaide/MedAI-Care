const express = require('express');
const router = express.Router();
const multer = require('multer');
const HealthRecord = require('../models/HealthRecord');
const cloudinary = require('../cloudinaryConfig');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload a new health record
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { patient, title } = req.body;

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'medaicare-records' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await streamUpload();

    const newRecord = new HealthRecord({
      patient,
      title,
      fileUrl: result.secure_url
    });

    await newRecord.save();
    res.status(201).json({ message: 'Health record uploaded', record: newRecord });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Get all health records for a patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const records = await HealthRecord.find({ patient: req.params.patientId });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Delete a health record
router.delete('/:id', async (req, res) => {
  try {
    await HealthRecord.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Health record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;