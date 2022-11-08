const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'Please provide a user .'],
    unique:true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this course.'],
    maxlength: [150, 'Name cannot be more than 150 characters']
  },
  PassWord: {
    type: String,
    required: [true, 'Please specify the status of your course.'],
    default:false,
  },
},{ timestamps: true })

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema); 