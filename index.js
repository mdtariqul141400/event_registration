require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const PORT = process.env.PORT || 3300;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Emitter = require('events');
const multer = require("multer");

// database connection 
// mongoose.connect("mongodb://127.0.0.1:27017/event", { useUnifiedTopology: true, useNewUrlParser: true }).then((result) => {
//     console.log('db connected');
// }).catch((err) => {
//     console.log(err)
// });

mongoose.connect("mongodb+srv://dewanict:dewanict2022@cluster0.tp6asco.mongodb.net/event?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }).then((result) => {
    console.log('db connected');
}).catch((err) => {
    console.log(err)
});

// Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());



// set Template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')


app.use((err,req,res,next)=>{
    if(err){
        console.log(err)
        res.status(500).send(err.message);
    }else{
        res.send("sucsses")
    }
})

// const upload = multer({
//     dest:"./public"
// })
// app.post("/registration",upload.single("photo"),(req,res)=>{
//     console.log(req.file)
//     res.json({f:req.file,data: req.body})
// })
// route
const route = require('./routes/routes');
app.use('/', route);
// app.get('*', (r, s) => {
//     s.redirect('/menu')
// })

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
