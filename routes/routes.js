const userCon = require("../controller/userCon");
// import controler 
const DashbordCon = require("../controller/dashbordCon");
//settting cont
const ArtCon = require("../controller/ArtCon")
//payment controler 
const PaymentCon = require("../controller/PaymentCon")
//card controler 
const CardCon = require("../controller/cardCon")


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
// route.post("/registration",)

route.get('/singin',(req,res)=>{
    res.render("login")
})
route.get('/setting',ArtCon().getpage)

route.get('/dashboard',DashbordCon().get);
route.post("/registration",userCon().upload.single("photo"),userCon().add,PaymentCon().gopayment)
// card 
route.get("/card/:id",CardCon().getcard);
route.post("/success",userCon().sucsses);
//art controler
route.post("/uploadlogo",ArtCon().upload.single("logo"),ArtCon().uploadLogo);
route.post("/uploadSill",ArtCon().upload.single("logo"),ArtCon().uploadSill);
route.post("/uploadeart",ArtCon().upload.single("logo"),ArtCon().uploadEart);
route.post("/uploadbg",ArtCon().upload.single("logo"),ArtCon().uploadBG);
route.post("/uploadfr",ArtCon().upload.single("logo"),ArtCon().uploadfr);


module.exports = route;