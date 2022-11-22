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
  sms_api:{
    type:String,
    require:true,
    default:"no api"
  },
  sms_id:{
    type: String,
    require:true,
    deafult:"no id"
  },
  sms_status:{
    type:Boolean,
    require:true,
    deafult:false
  }
},{ timestamps: true })

module.exports = mongoose.models.Payment || mongoose.model('Payment', Payment); 