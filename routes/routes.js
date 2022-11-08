const userCon = require("../controller/userCon");
// import controler 
const DashbordCon = require("../controller/dashbordCon");

const route = require('express').Router();
route.get('/',(req,res)=>{
    res.render("form")
})

route.get('/singin',(req,res)=>{
    res.render("login")
})
route.get('/setting',(req,res)=>{
    res.render("settings")
})

route.get('/dashbord',DashbordCon().get);
route.post("/registration",userCon().upload.single("photo"),userCon().add)


module.exports = route;