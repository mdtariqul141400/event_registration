const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  regNo: {
    type: Number,
    required: [true, 'Please provide a name for this course.'],
    unique:true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this course.'],
    maxlength: [150, 'Name cannot be more than 150 characters']
  },
  status: {
    type: Boolean,
    required: [true, 'Please specify the status of your course.'],
    default:false,
  },
  phone:{
    type: String,
    unique:true,
    required: [true, 'Please specify the duration course.'],
    unique:true,
  },
  address:{
    type: String,
    required: [true, 'Please specify the FEE course.'],
  },
  dress:{
    type: String,
    required: [true, 'Please specify the instructor course.'],
  },
  photo:{
    type: String,
  },
  regfor:{
    type: String,
    required: [true, 'Please specify the detailse course.'],
  },
  comment:{
    type: String,
  },
  BG :{
    type: String,
    required: [false, 'Please specify the detailse course.'],
  }
},{ timestamps: true })

module.exports = mongoose.models.User || mongoose.model('User', UserSchema); 