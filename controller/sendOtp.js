const Payment = require("../models/Payment");
const axios = require("axios")
const sendOTP = async (phone,otp)=>{
    try{
        const info = await Payment.findOne({name:"payment"});
        if(!info.sms_status){
            return
        }
        const ressms = await axios(`http://sms.dewanict.com/smsapi?api_key=${info.sms_api}&type=text&contacts=${phone}&senderid=${info.sms_id}&msg=আপনার গোপন কোড:${otp} কারো সাথে শেয়ার করবেন না`);
        console.log(ressms.data)
    }catch(error){
        console.log(error);
        return error
    }
}
module.exports = sendOTP;