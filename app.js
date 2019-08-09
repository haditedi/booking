const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');
const content = require(__dirname + '/content.js');

const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", (req,res) => {
  
  res.render("home");
});

app.post("/test", (req,res) => {
  
  const name = req.body.name;
  const arrDate = req.body.arrival; 
   
  const doc = new PDFDocument('A4');
  doc.image('public/image/logo.jpg', 250,5, {fit:[100,100]});
  doc.fontSize(10);
  doc.text(content.today(), 70, 100).moveDown();
  doc.text('Dear '+name+',').moveDown();
  doc.text(content.opening,{lineGap:10});
  doc.font('Helvetica-Bold').text('Name of Guest                       : '+name,{lineGap:5});
  doc.font('Helvetica-Bold').text('Number of Adults/Children   : '+name,{lineGap:5});
  doc.font('Helvetica-Bold').text('Arrival Date                                : '+content.fdate(arrDate),{lineGap:5});
  doc.moveDown();
  doc.font('Helvetica').text(content.mybody, {width: 500});

    
  doc.end();
  doc.pipe(fs.createWriteStream('confirmation/file.pdf'));
  doc.pipe(res);
  
  
  // stream.on('finish', function() {
  // const url = stream.toBlobURL('application/pdf');
  // iframe.src = url;
  // });
  // res.render('test');
  
  
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});