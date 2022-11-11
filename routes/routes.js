const userCon = require("../controller/userCon");
// import controler 
const DashbordCon = require("../controller/dashbordCon");
//settting cont
const ArtCon = require("../controller/ArtCon")
//payment controler 
const PaymentCon = require("../controller/PaymentCon")


// routing start heare ------>

const route = require('express').Router();
route.get('/',(req,res)=>{
    res.render("form")
});

//payment getway setup
route.get("/paycon",PaymentCon().getPage)
route.post("/update/storeid",PaymentCon().upSid)
route.post("/update/storepass",PaymentCon().upSpass)
route.post("/update/payamount",PaymentCon().upPamount)
route.get("/upldate/live",PaymentCon().uplive)
route.get("/upldate/status",PaymentCon().upStatus)
route.post("/registration",PaymentCon().gopayment)

route.get('/singin',(req,res)=>{
    res.render("login")
})
route.get('/setting',ArtCon().getpage)

route.get('/dashboard',DashbordCon().get);
// route.post("/registration",userCon().upload.single("photo"),userCon().add)


module.exports = route;