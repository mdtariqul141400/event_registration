const User = require("../models/userreg");
const Arts = require("../models/Arts")
const PaymentCon = require("./PaymentCon");
const cardCon = ()=>{
    return {
        getcard : async (req,res)=>{
            const regnom = req.params.id;
            try{
                const artdb = await Arts.findOne({});
                const datadb = await User.findOne({regNo:regnom});
                if(datadb){
                    if(!datadb.Payment.status){
                        
                        return 
                    }
                    res.render("card",{
                        data:datadb,
                        art:artdb
                    })
                }else{
                    res.redirect("/");
                }
            }catch(e){
                console.log(e);
                res.send(e)
            }
        }
    }
}
 
module.exports = cardCon;