const mongoose = require('mongoose');

// Patient ka schema - yani ek patient ka data kaisa dikhega
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });
// timestamps: true -> ye automatically record karega ki patient kab register hua

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;