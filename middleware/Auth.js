const ncrip = require("ncrip")
const Admin = require("../models/Admin")
function Auth (){
    return {
        Admin: async (req,res,next)=>{
            try {
                const data = req.cookies;
                if(!data.loc && !data.offer){
                    return res.redirect("/adminlogin")
                }
                const _id = ncrip.dnc(data.offer,data.loc);
                const datadb = await Admin.findOne({_id});
                if(datadb){
                    return next()
                }else{
                    return res.redirect("/adminlogin")
                }
            } catch (error) {
                console.log(error);
                return res.redirect("/adminlogin")
            }
        }
    }
}

module.exports = Auth;