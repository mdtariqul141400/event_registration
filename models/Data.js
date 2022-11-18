const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  status:{
    type: Boolean,
  }
},{ timestamps: true })

module.exports = mongoose.models.Data || mongoose.model('Data', DataSchema); 