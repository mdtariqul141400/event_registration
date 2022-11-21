const User = require("../models/userreg");
const CashPay = ()=>{
    return {
        getPage : async (req,res)=>{
            try {
                const page =req.query.p || 0;
                let docPP = 10;
                // db.collection.find({}).skip(perPage * page).limit(perPage)
                const cou = await User.find({"Payment.name" : "cash"})
                const AllData = await User.find({"Payment.name" : "cash"}).skip(docPP * page).limit(docPP);
                
                res.render("cash_req",{
                    data:AllData,
                    c:cou
                })
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        },
        query: async (req,res)=>{
            try{
                const {query} = req.body;
                
                if(+query){
                    const qdata = await User.find({"Payment.status":false,regNo:+query});
                    return res.render("cash_req",{
                        data:qdata,
                    })
                }
                const regX = new RegExp(query,"i")
                        
                const qdata = await User.find({"Payment.status":false,name:regX});
                return res.render("cash_req",{
                    data:qdata,
                })

            }catch(error){

            }
        }
    }
}


module.exports = CashPay;