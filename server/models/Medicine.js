const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  medicineName: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    enum: ['Once a day', 'Twice a day', 'Thrice a day', 'As needed'],
    default: 'Once a day'
  }
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;