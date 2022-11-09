const multer = require("multer");
const User = require("../models/userreg");
const fs = require("fs");
const path = require("path");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./public/upload/art")
    },
    filename: function (req, file, cb) {
        let d = new Date()
      cb(null, `${d.getTime()}-${file.originalname}`)
    }
  });

const Arts = require("../models/Arts");
const ArtCon = ()=>{
    return {
        getpage: async (req,res)=>{
            try {
                const data = await Arts.findOne();
                console.log(data)
                res.render("settings",{
                    data
                })
            } catch (error) {
                console.log(error);
                res.send("okkk")
            }
        },
        upload: multer({  
            storage: storage,
            limits:{
             fileSize: 3145728 // 3MB 
            }
        }),
        uploadLogo : async (req,res)=>{
            try {
                
            } catch (error) {
                
            }
        }
    }
}

module.exports = ArtCon;