const mongoose = require('mongoose');
const OTPSchema = new mongoose.Schema({
  Phone: {
    type: String,
    required: [true, 'Please provide a user .'],
    unique:true,
  },
  OTP: {
    type: String,
    required: [true, 'Please provide a name for this course.'],
    maxlength: [150, 'Name cannot be more than 150 characters']
  },
},{ timestamps: true })

module.exports = mongoose.models.OTP || mongoose.model('OTP', OTPSchema); 