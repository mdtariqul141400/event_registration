const mongoose = require('mongoose');
const Payment = new mongoose.Schema({
  name: {
    type: String,
    default:"payment"
  },
  ID: {
    type: String,
    default:"no store ID"
  },
  pass: {
    type: String,
    default:"no store password"
  },
  live: {
    type: Boolean,
    default:false
  },
  status: {
    type: Boolean,
    default:false
  },
  amount:{
    type:Number,
    default:0
  },
},{ timestamps: true })

module.exports = mongoose.models.Payment || mongoose.model('Payment', Payment); 