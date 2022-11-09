const mongoose = require('mongoose');
const ArtSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: [true, 'Please provide a user .'],
  },
  eventArt: {
    type: String,
    required: [true, 'Please provide a name for this course.'],
    maxlength: [150, 'Name cannot be more than 150 characters']
  },
  cardBG: {
    type: String,
    required: [true, 'Please specify the status of your course.'],
  },
  sill: {
    type: String,
    required: [true, 'Please specify the status of your course.'],
  },
},{ timestamps: true })

module.exports = mongoose.models.Art || mongoose.model('Art', ArtSchema); 