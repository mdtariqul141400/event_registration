const Data = require("../models/Data");

const Event = ()=>{
    return {
        updateName:async (req,res)=>{
            try {
                const {name} = req.body;
                const resdata = await Data.findOneAndUpdate({},{name});
                res.redirect("/dashboard");

            } catch (error) {
                console.log(error);
                res.send(error)
            }
        },
        updateDate:async (req,res)=>{
            try {
                const {date} =req.body;
                const resdb = await Data.findOneAndUpdate({},{date});
                res.redirect("/dashboard");
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        },
        updateStatus: async (req,res)=>{
            try {
                const data = await Data.findOne({});
                const resdb = await Data.findOneAndUpdate({},{status:!data.status});
                res.redirect("/dashboard");
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        }
    }
}
module.exports = Event;