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
        },
        copnfirm: async (req,res)=>{
            try{
                const _id = req.params.id;
                const us = await User.findOne({_id});
                res.render("confirmPay",{user:us})
            }catch(error){
                console.log(error);
                res.send(error)
            }
        },
        confirmPay: async (req,res)=>{
            try{
                const _id = req.params.id;
                const Payment = {
                    status: true,
                    name:"Cash",
                    pay_data:{
                        payment_id:`Cash-${new Date().getTime()}-${req.user._id}`,
                        date:new Date().toISOString(),
                        admin:req.user.name
                    }
                };

                const resdb = await User.findByIdAndUpdate({_id},{Payment});
                if(resdb){
                    return  res.redirect("/cashreq")
                }
                return  res.redirect("/cashreq")
            }catch(error){
                console.log(error);
                res.send(error);
            }
        },
        ALLgetPage : async (req,res)=>{
            try {
                const page =req.query.p || 0;
                let docPP = 10;
                // db.collection.find({}).skip(perPage * page).limit(perPage)
                const cou = await User.find({})
                const AllData = await User.find({}).skip(docPP * page).limit(docPP);
                
                res.render("alluser",{
                    data:AllData,
                    c:cou
                })
            } catch (error) {
                console.log(error);
                res.send(error)
            }
        },
        allquery: async (req,res)=>{
            try{
                const {query} = req.body;
                
                if(+query){
                    const qdata = await User.find({regNo:+query});
                    return res.render("alluser",{
                        data:qdata,
                    })
                }
                const regX = new RegExp(query,"i")
                        
                const qdata = await User.find({name:regX});
                return res.render("alluser",{
                    data:qdata,
                })

            }catch(error){
console.log(error)
            }
        },
    }
}


module.exports = CashPay;