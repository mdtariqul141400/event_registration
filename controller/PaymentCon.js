const Payment = require("../models/Payment");

const SSLCommerzPayment = require("sslcommerz-lts");
const PaymentCon = () => {
  return {
    getPage: async (req, res) => {
      try {
        const data = await Payment.findOne();
        if (data) {
          res.render("payset", {
            data,
            err: null,
          });
        } else {
          const load = new Payment({});
          const datas = await load.save();
          res.render("payset", {
            data: datas,
            err: null,
          });
        }
      } catch (error) {
        console.log(error);
        res.send("ok");
      }
    },
    upSid: async (req, res) => {
      try {
        const { id } = req.body;
        const data = await Payment.updateOne({ name: "payment" }, { ID: id });
        res.redirect("/paycon");
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    },
    upSpass: async (req, res) => {
      try {
        const { pass } = req.body;
        const data = await Payment.updateOne({ name: "payment" }, { pass });
        res.redirect("/paycon");
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    },
    upPamount: async (req, res) => {
      try {
        const { amount } = req.body;
        const data = await Payment.updateOne({ name: "payment" }, { amount });
        res.redirect("/paycon");
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    },
    uplive: async (req, res) => {
      try {
        const data = await Payment.findOne({ name: "payment" });

        if (
          data.ID !== "no store ID" &&
          data.pass !== "no store password" &&
          data.amount !== 0
        ) {
          const live = !data.live;
          const data2 = await Payment.updateOne({ name: "payment" }, { live });

          res.redirect("/paycon");
        } else {
          const data3 = await Payment.updateOne(
            { name: "payment" },
            { live: false }
          );
          res.render("payset", {
            data,
            err: "Please Add Gateway credentials",
          });
        }
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    },
    upStatus: async (req, res) => {
      try {
        const data = await Payment.findOne({ name: "payment" });

        if (
          data.ID !== "no store ID" &&
          data.pass !== "no store password" &&
          data.amount !== 0
        ) {
          const status = !data.status;
          const data2 = await Payment.updateOne(
            { name: "payment" },
            { status }
          );

          res.redirect("/paycon");
        } else {
          const data3 = await Payment.updateOne(
            { name: "payment" },
            { status: false }
          );
          res.render("payset", {
            data,
            err: "Please Add Gateway credentials",
          });
        }
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    },
    gopayment: async (req, res) => {
      try {
        const datadb = await Payment.findOne({ name: "payment" });
        if (!datadb.status) {
          return res.send("gatway off");
        }
        const tr_id = new Date().getTime();
        const data = {
          total_amount: datadb.amount,
          currency: "BDT",
          tran_id: req.user.regNo, // use unique tran_id for each api call
          success_url: "http://" + req.headers.host + "/success",
          fail_url: "http://" + req.headers.host + "/fail",
          cancel_url: "http://" + req.headers.host + "/paycancel",
          ipn_url: "http://" + req.headers.host + "/ipn",
          shipping_method: "Online",
          product_name: "Event_Packg.",
          product_category: "Service",
          product_profile: "general",
          cus_name: datadb.name,
          cus_email: 'customer@example.com',
          cus_add1: "Dhaka",
          cus_add2: "Dhaka",
          cus_city: "Dhaka",
          cus_state: "Dhaka",
          cus_postcode: "1000",
          cus_country: "Bangladesh",
          cus_phone: '01711111111',
          cus_fax: '01711111111',
          ship_name: "Online",
          ship_add1: "Dhaka",
          ship_add2: "Dhaka",
          ship_city: "Dhaka",
          ship_state: "Dhaka",
          ship_postcode: 1000,
          ship_country: "Bangladesh",
        };
        const sslcz = new SSLCommerzPayment(
          datadb.ID,
          datadb.pass,
          datadb.live
        );

        sslcz.init(data).then((apiResponse) => {
          // Redirect the user to payment gateway
          console.log(apiResponse);
          let GatewayPageURL = apiResponse.GatewayPageURL;
          console.log("Redirecting to: ", GatewayPageURL);
          // res.redirect(GatewayPageURL);
        });
      } catch (error) {
        console.log(error);
      }
    },
    upsmsApi: async (req, res) => {
      try {
        const { sms_api } = req.body;
        const data = await Payment.updateOne({ name: "payment" }, { sms_api });
        res.redirect("/paycon");
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    },
    upsmsId: async (req, res) => {
      try {
        const { sms_id } = req.body;
        const data = await Payment.updateOne({ name: "payment" }, { sms_id });
        res.redirect("/paycon");
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    },
    upSmSStatus: async (req, res) => {
      try {
        const data2 = await Payment.findOne({ name: "payment" });
        const data = await Payment.updateOne(
          { name: "payment" },
          { sms_status: !data2.sms_status }
        );
        res.redirect("/paycon");
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    },
  };
};

module.exports = PaymentCon;
