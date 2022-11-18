const User = require("../models/userreg");
const Data = require("../models/Data")

const DashbordCon = ()=>{
    return{
        get: async (req,res)=>{
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
                res.render("dashBoard",{
                    user:data,
                    event: resedata,
                })
                   
                }else{
                    const data = await User.find().sort({_id:-1}).limit(10);
                res.render("dashBoard",{
                    user:data,
                    event: eData,
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