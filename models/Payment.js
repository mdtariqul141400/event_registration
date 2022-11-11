const mongoose = require('mongoose');
const Payment = new mongoose.Schema({
  ID: {
    type: String,
    required: [true, 'Please provide a user .'],
  },
  pass: {
    type: String,
    required: [true, 'Please provide a name for this course.'],
  },
  live: {
    type: Boolean,
    default:false
  },
  status: {
    type: Boolean,
    default:false
  },
},{ timestamps: true })

module.exports = mongoose.models.Payment || mongoose.model('Payment', Payment); 