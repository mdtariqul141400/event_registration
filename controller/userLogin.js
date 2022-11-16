const OTP = require("../models/OTP");
const ncrip = require("ncrip");
const User = require("../models/userreg");
const UserLoginCon = ()=>{
    return {
        getpage: (req,res)=>{
            res.render("ulogin")
        },
        postNum : async (req,res)=>{
            try {
                const {phone} = req.body;
                const udb = await User.findOne({phone:phone});
                if(!udb){
                    return res.redirect("/")
                }
                const db_data = await OTP.findOne({Phone:phone});
                if(db_data){
                    return  res.render("otp",{ phone:db_data.Phone})
                }
                const otp = Math.round(Math.random() * 90000)
                console.log("your OTP is:"+otp)
                const Load = new OTP(
                    {
                        Phone:phone,
                        OTP:otp,
                    }
                );
                const resdb = await Load.save();
                res.render("otp",{ phone:resdb.Phone})
            } catch (error) {
                console.log(error)
                res.send(error)
            }
        },
        votp:async (req,res)=>{
            try{
                const {phone,otp} = req.body;
                const resdb = await OTP.findOne({Phone:phone});
                if(!resdb){
                    return res.redirect("/ulogin")
                }
                if(resdb.OTP === otp){
                    const userdb = await User.findOne({phone:phone});
                    const rand = Math.round(Math.random()*10000);
                    let key = ncrip.enc(userdb._id,rand);
                    res.cookie("temp",key);
                    res.cookie("step",rand);
                    res.redirect('/profile');
                }else{
                    return res.redirect("/ulogin")
                }
            }catch(error){
                console.log(error);
                res.send(error);
            }
        }
    }
}
module.exports = UserLoginCon;