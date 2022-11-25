const Data = require("../models/Data");

const Active = ()=>{
    return {
        status: async (req,res,next)=>{
            try {
                const Datares = await Data.findOne({});
                if(!Datares || !Datares.status){
                    return res.send("registratin end")
                }
                next()
                
            } catch (error) {
                console.log(error)
            }
        }
    }
}




module.exports = Active;