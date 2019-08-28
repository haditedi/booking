require('dotenv').config();
const nodemailer = require("nodemailer");

async function sendingMail(){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.USER, 
      pass: process.env.PASS 
    },
  });

  let info = await transporter.sendMail({
    from: "sales@monarchhouse.co.uk", // sender address
    to: "hadi.tedi@monarchhouse.co.uk", // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    attachments: [
        {   
            filename: 'text1.pdf',
            path: 'public/confirmation/file.pdf'
        }]
    
  });

  console.log("Message sent: %s", info.messageId);
}

sendingMail();

