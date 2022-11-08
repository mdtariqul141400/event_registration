const userCon = require("../controller/userCon");

const route = require('express').Router();
route.get('/',(req,res)=>{
    res.render("form")
})

route.get('/singin',(req,res)=>{
    res.render("login")
})
route.get('/dashbord',(req,res)=>{
    res.render("dashBoard")
})
route.post("/registration",userCon().upload.single("photo"),userCon().add)


module.exports = route;