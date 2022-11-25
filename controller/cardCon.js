const User = require("../models/userreg");
const Arts = require("../models/Arts")
const PaymentCon = require("./PaymentCon");
const Payment = require("../models/Payment")
const Event = require("../models/Data");
const SSLCommerzPayment = require('sslcommerz-lts')

const cardCon = ()=>{
    return {
        getcard : async (req,res)=>{
            const regnom = req.params.id;
            const user = req.user;
            if(user.regNo != regnom){
                return res.redirect("/userLogin")
            }
            // host
            try{
                const artdb = await Arts.findOne({});
                const datadb = await User.findOne({regNo:regnom});
                const edata = await Event.findOne({});
                if(datadb){
                    if(!datadb.Payment.status){
                        const getpayment = async (req,res)=>{
                            const paydb = await Payment.findOne({name:"payment"});
                                if(!paydb.status){
                                    return res.send(" payment gatway off")
                                }
                                const data = {
                                    total_amount: paydb.amount,
                                    currency: 'BDT',
                                    tran_id: datadb.regNo, // use unique tran_id for each api call
                                    success_url: "http://"+req.headers.host+'/success',
                                    fail_url: "http://"+req.headers.host+'/fail',
                                    cancel_url: "http://"+req.headers.host+'/paycancel',
                                    ipn_url:"http://"+req.headers.host+'/ipn',
                                    shipping_method: 'Online',
                                    product_name: 'Event_Packg.',
                                    product_category: 'Service',
                                    product_profile: 'general',
                                    cus_name: datadb.name,
                                    cus_email: 'customer@example.com',
                                    cus_add1: 'Dhaka',
                                    cus_add2: 'Dhaka',
                                    cus_city: 'Dhaka',
                                    cus_state: 'Dhaka',
                                    cus_postcode: '1000',
                                    cus_country: 'Bangladesh',
                                    cus_phone: '01711111111',
                                    cus_fax: '01711111111',
                                    ship_name: "Online",
                                    ship_add1: 'Dhaka',
                                    ship_add2: 'Dhaka',
                                    ship_city: 'Dhaka',
                                    ship_state: 'Dhaka',
                                    ship_postcode: 1000,
                                    ship_country: 'Bangladesh',
                                    value_a: user.regNo,
                                };
                                const sslcz = new SSLCommerzPayment(paydb.ID,paydb.pass, paydb.live);
                                sslcz.init(data).then(apiResponse => {
                                    // Redirect the user to payment gateway
                                    let GatewayPageURL = apiResponse.GatewayPageURL
                                    res.redirect(GatewayPageURL)
                                    console.log('Redirecting to: ', GatewayPageURL)
                                });
                        }   
                        return getpayment(req,res);  
                    }
                     
                    res.render("card",{
                        data:datadb,
                        art:artdb,
                        edata
                    })
                }else{
                    res.redirect("/userLogin");
                }
            }catch(e){
                console.log(e);
                res.send(e)
            }
        }
    }
}
 
module.exports = cardCon;