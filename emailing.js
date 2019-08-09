require('dotenv').config();
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

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
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

