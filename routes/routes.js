const userCon = require("../controller/userCon");
// import controler 
const DashbordCon = require("../controller/dashbordCon");
//settting cont
const ArtCon = require("../controller/ArtCon")


// routing start heare ------>

const route = require('express').Router();
route.get('/',(req,res)=>{
    res.render("form")
});

route.get("/paycon",(req,res)=>{
    res.render("payset")
})

route.get('/singin',(req,res)=>{
    res.render("login")
})
route.get('/setting',ArtCon().getpage)

route.get('/dashboard',DashbordCon().get);
route.post("/registration",userCon().upload.single("photo"),userCon().add)


module.exports = route;