const multer = require("multer");
const User = require("../models/userreg");
const fs = require("fs");
const path = require("path");
const { listeners } = require("../models/userreg");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./public/upload/userimg")
    },
    filename: function (req, file, cb) {
        let d = new Date()
      cb(null, `${d.getTime()}-${file.originalname}`)
    }
  });
  

const userCon = ()=>{
    return {
        add: async (req,res,next)=>{
            const data = req.body;
            
            try {
                let payment;
            if(data.pay === "Online"){
                payment ={
                    status:false,
                    name:"online try"
                }
            }else if(data.pay === "Cash"){
                payment = {
                    status:false,
                    name:"cash"
                }
            }else{
                payment = {
                    status:false,
                    name:"un"
                }
            }
                const lastData = await User.find().sort({_id:-1}).limit(1);
                const lastRegNum = lastData[0]? lastData[0].regNo: 0;
                const load = new User({
                    regNo:lastRegNum + 1,
                    name:data.name,
                    address:data.address,
                    phone:data.phone,
                    dress:data.Tshirt,
                    regfor:data.regfor,
                    photo:req.file? req.file.filename:"nophoto.png",
                    BG:data.BG,
                    Payment:payment,
                })
                const resdb = await load.save()
                console.log(data.pay)
                if(data.pay === "Online"){
                    req.user= resdb;
                    next();
                }else if(data.pay === "Cash"){
                    console.log("cash")
                    res.redirect("/card/"+resdb.regNo);
                }
            } catch (error) {
                if(req.file){
                    await fs.unlinkSync(path.resolve(__dirname + "/../public/upload/userimg/"+req.file.filename))
                }
                console.log(error)
                res.send(error)
            }
        },
        upload: multer({  
            storage: storage,
            limits:{
             fileSize: 3145728 // 3MB 
            }
        }),
        sucsses:async (req,res)=>{
            try{
                const paydata = req.body;
            
                const update = {
                    status:true,
                    name:"online",
                    pay_data:paydata
                }
                const resdb = await User.findOneAndUpdate({regNo:paydata.tran_id},{Payment:update});
                
                res.redirect("/card/"+resdb.regNo)
            }catch(e){
                console.log(e);
                res.send(e)
            }
        }
       
    }
}


module.exports = userCon;