const User = require("../models/userreg");
const Data = require("../models/Data");
const Payment = require("../models/Payment")

const DashbordCon = ()=>{
    return{
        get: async (req,res)=>{
            let today = new Date();
            try {
                const eData = await Data.findOne({});
                if(!eData){
                   let load = new Data({
                    name:"no Name",
                    date:"00-00-0000",
                    status:false
                   });

                   const resedata = await load.save();

                   const data = await User.find().sort({_id:-1}).limit(10);
                   // 

                    //count status
                                    
                    const {amount} = await Payment.findOne({}); 

                    const Today_user = await User.find({createdAt:{
                        $lte : today,
                        $gte:new Date(today.getFullYear(),today.getMonth(),today.getDate())
                    }}).countDocuments();

                    const Tomorow_user = await User.find({createdAt:{
                        $lte : new Date(today.getFullYear(),today.getMonth(),today.getDate()-1,23,59,59,60),
                        $gte:new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)
                    }}).countDocuments();

                    // payment 
                    const Today_user_pay = await User.find({
                        updatedAt:{
                            $lte : today,
                            $gte:new Date(today.getFullYear(),today.getMonth(),today.getDate())
                            },
                        "Payment.status": true
                    }).countDocuments();

                    const Tomorow_user_pay = await User.find({
                    updatedAt:{
                            $lte : new Date(today.getFullYear(),today.getMonth(),today.getDate()-1,23,59,59,60),
                            $gte:new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)
                        },
                    "Payment.status": true
                    }).countDocuments();

                    const stats = {
                    user : {
                        today:Today_user,
                        tomorow:Tomorow_user
                    },
                    payment:{
                        today: Today_user_pay * amount,
                        tomorow:Tomorow_user_pay * amount
                    }
                    }

                   //end

                   
                res.render("dashBoard",{
                    user:data,
                    event: resedata,
                    stats
                })
                   
                }else{
                    const data = await User.find().sort({_id:-1}).limit(10);

//count status
                
                    const {amount} = await Payment.findOne({}); 

                    const Today_user = await User.find({createdAt:{
                        $lte : today,
                        $gte:new Date(today.getFullYear(),today.getMonth(),today.getDate())
                    }}).countDocuments();

                    const Tomorow_user = await User.find({createdAt:{
                        $lte : new Date(today.getFullYear(),today.getMonth(),today.getDate()-1,23,59,59,60),
                        $gte:new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)
                    }}).countDocuments();

                    // payment 
                    const Today_user_pay = await User.find({
                        updatedAt:{
                            $lte : today,
                            $gte:new Date(today.getFullYear(),today.getMonth(),today.getDate())
                            },
                        "Payment.status": true
                }).countDocuments();
                
                const Tomorow_user_pay = await User.find({
                    updatedAt:{
                            $lte : new Date(today.getFullYear(),today.getMonth(),today.getDate()-1,23,59,59,60),
                            $gte:new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)
                        },
                    "Payment.status": true
            }).countDocuments();

                   const stats = {
                    user : {
                        today:Today_user,
                        tomorow:Tomorow_user
                    },
                    payment:{
                        today: Today_user_pay * amount,
                        tomorow:Tomorow_user_pay * amount
                    }
                   }


                res.render("dashBoard",{
                    user:data,
                    event: eData,
                    stats
                })
                }
                
            } catch (error) {
                console.log(error);
                res.send("error")
            }
        }
    }
}

module.exports = DashbordCon;