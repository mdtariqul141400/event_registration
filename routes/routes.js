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
///event controler
const Event = require("../controller/EventInfoCon")

// cash payment 
const CashPay = require("../controller/cashPay")
//
// form con 
const Form = require("../controller/regFromCon")


// routing start heare ------>

const route = require('express').Router();
route.get('/',Form().getpage);
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
route.post("/update/smsid",Auth().Admin,PaymentCon().upsmsId)
route.post("/update/smsapi",Auth().Admin,PaymentCon().upsmsApi)
route.get("/upldate/smsstatus",Auth().Admin,PaymentCon().upSmSStatus)
// 
// route.post("/registration",)

route.get('/singin',(req,res)=>{
    res.render("login")
})
route.get('/setting',Auth().Admin,ArtCon().getpage)

route.get('/dashboard',Auth().Admin,DashbordCon().get);
route.post("/registration",userCon().upload.single("photo"),userCon().add,PaymentCon().gopayment)
//userlogin 
route.get("/userLogin",UserLoginCon().getpage);
route.get("/userlogout",UserLoginCon().logout);
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
route.post("/updateAdminUser",Auth().Admin,Admincon().changeUser);
route.post("/updateAdminPass",Auth().Admin,Admincon().changePass);
route.get("/adlogout",Admincon().logout);
//update event data 
route.post("/eventname",Auth().Admin,Event().updateName);
route.post("/eventdate",Auth().Admin,Event().updateDate);
route.get("/eventstatus",Auth().Admin,Event().updateStatus);

//test
route.get("/qq",userCon().qq)
//cash requist ------====>
route.get("/cashreq",Auth().Admin,CashPay().getPage);
route.post("/cashreq",Auth().Admin,CashPay().query);
route.get("/conferm/:id",Auth().Admin,CashPay().copnfirm);
route.get("/confirmpay/:id",Auth().Admin,CashPay().confirmPay)
route.get("/users",Auth().Admin,CashPay().ALLgetPage);
route.post("/users",Auth().Admin,CashPay().allquery);



module.exports = route;