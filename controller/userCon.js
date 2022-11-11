const multer = require("multer");
const User = require("../models/userreg");
const fs = require("fs");
const path = require("path");

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
        add: async (req,res)=>{
            const data = req.body;
            try {
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
                    BG:data.BG
                })
                const resdb = await load.save()
                res.send("ok")
            } catch (error) {
                await fs.unlinkSync(path.resolve(__dirname + "/../public/upload/userimg/"+req.file.filename))
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
       
    }
}


module.exports = userCon;