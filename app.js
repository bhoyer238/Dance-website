const express = require("express");
const path = require('path');
const app= express();
const bodypareser =require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance');
const port=80;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    Address: String,
    des: String
  });

  const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUF 
app.use("/static", express.static('static'))// For Serving Static Files
app.use(express.urlencoded())

// Set The templete Engine For Pug 
app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));// Set The view Directery

// Endpoints of website
app.get("/", (req, res)=>{
    res.status(200).render('home.pug')
});
app.get("/contact", (req, res)=>{
    res.status(200).render('contact.pug')
});
app.post("/contact", (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Your Data Hase Been Saved in Our Data Base")
    }).catch(()=>{
        res.status(400).send("You Data Hase Note Save in Data Base Becouse Of The Techical issu")
    });
    // res.status(200).render('contact.pug')
});
// Start The server
app.listen(port,()=>{
    console.log(`The application start succesful on ${port}`);
});
