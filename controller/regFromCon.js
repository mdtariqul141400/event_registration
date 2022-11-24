const Payment =require("../models/Payment");
const ART = require("../models/Arts");
const Data = require("../models/Data");
const form = ()=>{
    return{
        getpage: async (req,res)=>{
            try {
                const Paydata = await Payment.findOne();
                const ARTd = await ART.findOne();
                const Datad = await Data.findOne();
                console.log({
                    pay:Paydata.amount,
                   art: ARTd,
                   data: {
                    name: Datad.name,
                    date:Datad.date
                   }
                })
                res.render("form2",{
                    pay:Paydata.amount,
                   art: ARTd,
                   data: {
                    name: Datad.name,
                    date:Datad.date
                   }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = form;