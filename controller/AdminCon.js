const Admin = require("../models/Admin");
const ncrip = require("ncrip");
const AdminCon = ()=>{
    return {
        getLogin : async (req,res)=>{
            try {
                const db = await Admin.find({});
                if (!db[0]){
                    const l = new Admin({
                        user:"admin@admin",
                        name:"DewanIct Picnic",
                        PassWord:"155540,142814,168266,69286,70700,72114,73528"
                    });
                    const dr = await l.save();
                }
                res.render("login");
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        },
        login:async (req,res)=>{
            try{
                const data = req.body;
                const db = await Admin.findOne({user:data.user});
                if(!db){
                    return res.redirect("/")
                }
                const dpass = ncrip.dnc(db.PassWord,1414);
                if(data.pass === dpass){
                    const rand = Math.round(Math.random()*10000);
                    let key = ncrip.enc(db._id,rand);
                    res.cookie("offer",key);
                    res.cookie("loc",rand);
                    res.redirect('/dashboard');
                }else{
                    res.redirect("/")
                }
            }catch(error){
                console.log(error);
                res.send(error)
            }
        },
        changeUser:async (req,res)=>{
            try {
                const {user} = req.body;
                const resdb = await Admin.findOneAndUpdate({},{user});
                res.redirect("/setting");
            } catch (error) {
                console.log(error);
                res.send(error);

            }
        },
        changePass:async (req,res)=>{
            try {
                const {pass} = req.body;
                const PassWord = ncrip.enc(pass,1414)
                const resdb = await Admin.findOneAndUpdate({},{PassWord});
                res.redirect("/setting");
            } catch (error) {
                console.log(error);
                res.send(error);

            }
        },
        logout:(req,res)=>{
            res.cookie("offer","");
            res.cookie("loc","");
            res.redirect('/');
        }
    }
}

module.exports = AdminCon;