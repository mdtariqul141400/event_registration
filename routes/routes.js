// auth mid
const Auth = require("../middleware/Auth")
//
const userCon = require("../controller/userCon");
// import controler 
const DashbordCon = require("../controller/dashbordCon");
//settting cont
const ArtCon = require("../controller/ArtCon")
//payment controler 
const PaymentCon = require("../controller/PaymentCon")
//card controler 
const CardCon = require("../controller/cardCon");
// admin controler
const Admincon = require("../controller/AdminCon")
// user aaction 
const UserLoginCon = require("../controller/userLogin")
// routing start heare ------>

const route = require('express').Router();
route.get('/',(req,res)=>{
    res.render("form")
});
//profile 
route.get("/profile",Auth().user,(req,res)=>{
    res.render("user",{user:req.user})
})

//payment getway setup
route.get("/paycon",PaymentCon().getPage)
route.post("/update/storeid",Auth().Admin,PaymentCon().upSid)
route.post("/update/storepass",Auth().Admin,PaymentCon().upSpass)
route.post("/update/payamount",Auth().Admin,PaymentCon().upPamount)
route.get("/upldate/live",Auth().Admin,PaymentCon().uplive)
route.get("/upldate/status",Auth().Admin,PaymentCon().upStatus)
// route.post("/registration",)

route.get('/singin',(req,res)=>{
    res.render("login")
})
route.get('/setting',Auth().Admin,ArtCon().getpage)

route.get('/dashboard',Auth().Admin,DashbordCon().get);
route.post("/registration",userCon().upload.single("photo"),userCon().add,PaymentCon().gopayment)
//userlogin 
route.get("/userLogin",UserLoginCon().getpage);
route.post("/userlogin",UserLoginCon().postNum);

route.post("/votp",UserLoginCon().votp);

route.get("/otp",(req,res)=>{
    res.render("otp")
})
// card 
route.get("/card/:id",Auth().user,CardCon().getcard);
route.post("/success",userCon().sucsses);
//art controler
route.post("/uploadlogo",Auth().Admin,ArtCon().upload.single("logo"),ArtCon().uploadLogo);
route.post("/uploadSill",Auth().Admin,ArtCon().upload.single("logo"),ArtCon().uploadSill);
route.post("/uploadeart",Auth().Admin,ArtCon().upload.single("logo"),ArtCon().uploadEart);
route.post("/uploadbg",Auth().Admin,ArtCon().upload.single("logo"),ArtCon().uploadBG);
route.post("/uploadfr",Auth().Admin,ArtCon().upload.single("logo"),ArtCon().uploadfr);
// Admin Controler 
route.get("/adminlogin",Admincon().getLogin);
route.post("/login",Admincon().login)


module.exports = route;