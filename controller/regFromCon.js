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
                    pay: Paydata? Paydata.amount || 0 : 0,
                   art: ARTd,
                   data: {
                    name: Datad? Datad.name || "" :"",
                    date:Datad? Datad.date || "" :""
                   }
                })
                res.render("form2",{
                    pay:Paydata? Paydata.amount || "": "",
                   art: ARTd || "",
                   data: {
                    name:Datad? Datad.name || "" : "",
                    date:Datad? Datad.date || "" : ""
                   }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = form;