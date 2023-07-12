const express = require('express');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const router = express.Router();

router.post('/', async(req, res) => {
    const userEmail = req.body.email;
    const nodemailer = require("nodemailer");
    
    const authCode = crypto.randomBytes(3).toString('hex');

    let emailTemplete;
    ejs.renderFile('./template.ejs', { userEmail:userEmail, authCode: authCode}, (err, data) =>{
        if(err){console.log(err)};
         emailTemplete = data;
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    });
    
    async function main() {
      const info = await transporter.sendMail({
        from: process.env.NODEMAILER_USER, // sender address
        to: userEmail, // list of receivers
        subject: "인증번호를 입력해 이메일 인증을 해주세요.", // Subject line
        html: emailTemplete, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    }
    
    main().catch(console.error);

    res.redirect('/');
});

router.get('/', (req, res) =>{
  const userInputCode = req.body.authCode;
  console.log(userInputCode);
})


module.exports = router;