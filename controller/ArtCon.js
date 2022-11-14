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
        upload: multer({  
            storage: storage,
            limits:{
             fileSize: 3145728 // 3MB 
            }
        }),
        getpage: async (req,res)=>{
            try {
                const data = await Arts.findOne();
                if(!data){
                    let new_load = new Arts({
                        logo:"no.png",
                          eventArt: "no.png",
                          cardBG: "no.png",
                          sill: "no.png",
                          fr:"no.png"
                    });
                    const resdbs = await new_load.save();
                    return res.render("settings",{
                        data:resdbs
                    })
                }
                res.render("settings",{
                    data
                })
            } catch (error) {
                console.log(error);
                res.send("okkk")
            }
        },
        uploadLogo : async (req,res)=>{
            try {
                const resdb = await Arts.findOne({});
                if(resdb.logo !== "no.png"){
                    await fs.unlinkSync(path.resolve(__dirname + "/../public/upload/art/"+resdb.logo));
                }
                const db = await Arts.findOneAndUpdate({},{logo:req.file.filename});
                res.redirect("/setting")
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        },
        uploadSill : async (req,res)=>{
            try {
                const resdb = await Arts.findOne({});
                if(resdb.sill !== "no.png"){
                    await fs.unlinkSync(path.resolve(__dirname + "/../public/upload/art/"+resdb.sill));
                }
                const db = await Arts.findOneAndUpdate({},{sill:req.file.filename});
                res.redirect("/setting")
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        },
        uploadEart : async (req,res)=>{
            try {
                const resdb = await Arts.findOne({});
                if(resdb.eventArt !== "no.png"){
                    await fs.unlinkSync(path.resolve(__dirname + "/../public/upload/art/"+resdb.eventArt));
                }
                const db = await Arts.findOneAndUpdate({},{eventArt:req.file.filename});
                res.redirect("/setting")
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        },
        uploadBG : async (req,res)=>{
            try {
                const resdb = await Arts.findOne({});
                if(resdb.cardBG !== "no.png"){
                    await fs.unlinkSync(path.resolve(__dirname + "/../public/upload/art/"+resdb.cardBG));
                }
                const db = await Arts.findOneAndUpdate({},{cardBG:req.file.filename});
                res.redirect("/setting")
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        },
        uploadfr : async (req,res)=>{
            try {
                const resdb = await Arts.findOne({});
                if(resdb.fr !== "no.png"){
                    await fs.unlinkSync(path.resolve(__dirname + "/../public/upload/art/"+resdb.fr));
                }
                const db = await Arts.findOneAndUpdate({},{fr:req.file.filename});
                res.redirect("/setting")
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        },
    }
}

module.exports = ArtCon;