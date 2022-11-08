const User = require("../models/userreg");

const DashbordCon = ()=>{
    return{
        get: async (req,res)=>{
            try {
                const data = await User.find().sort({_id:-1}).limit(10);
                res.render("dashBoard",{
                    user:data
                })
            } catch (error) {
                console.log(error);
                res.send("error")
            }
        }
    }
}

module.exports = DashbordCon;