require('dotenv').config();
const nodemailer = require("nodemailer");

async function sendingMail(){
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
    from: process.env.FROMEMAIL, 
    to: email, 
    subject: "Monarch House confirmation for "+name, // Subject line
    text: "Thank you for your booking",
    attachments: [
        {   
            filename: filename+'.pdf',
            path: 'public/confirmation/'+filename+'.pdf'
        }]
    
  });

  console.log("Message sent: %s", info.messageId);
}

sendingMail();
