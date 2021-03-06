const express = require("express");
const bodyParser = require("body-parser");
const PDFDocument = require('pdfkit');
const content = require(__dirname + '/content.js');
const fs = require('fs');
require('dotenv').config();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://"+process.env.MONGOUSER+":"+process.env.MONGOPASS+"@cluster0-z0o0o.azure.mongodb.net/monarchDB?retryWrites=true&w=majority", { useNewUrlParser: true});
const bookingSchema = new mongoose.Schema({
  name: String, email: String, arrDate: String, depDate: String, rate: String, 
  confirmation: String, aptType: String, numNights: String, numAdults: String,
  numChildren: String, comment: String, occ: String, cancellation: String
});
const Booking = new mongoose.model("Booking", bookingSchema);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", (req,res) => {
  res.render("home");
});

app.get("/test", (req,res) => {
  res.render("test");
});

app.post("/test", (req,res) => {
  const today = content.today();
  const name = req.body.name, email = req.body.email;
  const arrDate = req.body.arrival, depDate=req.body.departure, rate=req.body.rate, confirmation=req.body.confirmation; 
  const aptType=req.body.apartmentType;
  const calcArrDate = new Date(arrDate), calcDepDate = new Date(depDate);
  const numNights = calcDepDate.getDate()-calcArrDate.getDate();
  const numAdults = req.body.numAdults; 
  let numChildren = req.body.numChildren;
  const comment = req.body.comment;
  const occ = req.body.maxOcc, cancellation = req.body.cancellation;

  // if generating PDF file
  // Booking.insertMany([{name: name, email: email, arrDate: arrDate, depDate: depDate, rate: rate, 
  // confirmation: confirmation, aptType: aptType, numNights: numNights, numAdults: numAdults,
  // numChildren: numChildren, comment: comment, 
  // occ: occ, cancellation: cancellation}], (err,doc) => {
  //   if (err) {
  //     console.log(err);
  //     } else {
  //     console.log(doc);
  //     console.log("successfully saved");
  //     }
  // });

  // let test;
  // if (occ === "") {
  //   if (numChildren === ""){
  //     numChildren = "0";
  //     test = numAdults+' / '+numChildren;
  //   }
  // } else {
  //   test = "Maximum "+occ+ " guests";
  // }
  
  // let xMain = 70, xSecondary=210, ySecondary=180;
  // const doc = new PDFDocument;
  // doc.image('public/image/logo.jpg', 250, 10, {fit:[100,100], align: 'center', valign: 'center'});
  // doc.fontSize(10);
  // doc.text(content.today(), xMain, 100).moveDown();
  // doc.moveDown();
  // doc.text('Dear '+name+',').moveDown();
  // doc.text(content.opening,{lineGap:10});
  // doc.font('Helvetica-Bold').text('Name of Guest ',{lineGap:5});
  // doc.text(':  '+name, xSecondary, ySecondary);
  // doc.text('Number of Adults/Children ',xMain,ySecondary+15);
  // doc.text(':  '+test, xSecondary, ySecondary+15);
  // doc.text('Arrival Date ',xMain,ySecondary+30);
  // doc.text(':  '+content.fdate(arrDate),xSecondary,ySecondary+30);
  // doc.text('Departure Date ', xMain,ySecondary+45);
  // doc.text(':  '+content.fdate(depDate),xSecondary, ySecondary+45);
  // doc.text('No. of Nights ', xMain, ySecondary+60);
  // doc.text(':  '+numNights, xSecondary, ySecondary+60);
  // doc.text('Rate/night & Room type ', xMain, ySecondary+75);
  // doc.text(':  £ '+rate+' exclusive VAT in a '+aptType,xSecondary, ySecondary+75);
  // doc.text('Reservation Number ',xMain, ySecondary+90);
  // doc.text(': '+confirmation,xSecondary, ySecondary+90);
  // doc.text('Comment ', xMain, ySecondary+105);
  // doc.text(':  '+comment, xSecondary, ySecondary+105);
  // doc.font('Helvetica').text(content.policy, xMain, ySecondary+125, {width: 475});
  // doc.moveDown();
  
  // doc.fontSize(8);
  // doc.moveDown();
  // doc.moveDown();
  // doc.font('Helvetica').text(content.footer, {width: 475, align: 'center'});
  // const filename = name+confirmation; 
  // doc.pipe(fs.createWriteStream('public/confirmation/'+filename+'.pdf'));
  
  // doc.end();

  function sendingMail(){
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      requireTLS: true, 
      auth: {
        user: process.env.USER, 
        pass: process.env.PASS 
      },
    });
  
    ejs.renderFile(__dirname + "/views/beetest.ejs", { name: name, today: today }, function (err, data) {
      if (err) {
          console.log(err);
      } else {
          let mainOptions = {
              from: process.env.FROMEMAIL,
              to: "hadi.tedi@monarchhouse.co.uk",
              subject: 'Hello, world',
              html: data
          };
          console.log("html data ======================>", mainOptions.html);
          transporter.sendMail(mainOptions, function (err, info) {
              if (err) {
                  console.log(err);
              } else {
                  console.log('Message sent: ' + info.response + info.messageID);
              }
          });
      }
      
    }); 
  
  }
  
  sendingMail();

  res.render("beetest", {name: name, today : today});
    
});

app.get('/testmail', (req,res) => {
  res.render('testmail',{name: 'test'});
})

let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server started on port %d", port);
});