const ncrip = require("ncrip")
const User = require("../models/userreg");
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
                    req.user = datadb; 
                    return next()
                }else{
                    return res.redirect("/adminlogin");
                }
            } catch (error) {
                console.log(error);
                return res.redirect("/adminlogin")
            }
        },
        user:async (req,res,next)=>{
            try {
                const {temp,step} = req.cookies;
                if(!temp && !step){
                   
                    return res.redirect("/userLogin");
                }
                const _id = ncrip.dnc(temp,step);
                const userdb = await User.findOne({_id});
                if(!userdb){
                   
                    return res.redirect("/userLogin");
                }
                req.user = userdb;
                next()
            } catch (error) {
                console.log(error);
                res.redirect("/userLogin")
            }
        }
    }
}

module.exports = Auth;