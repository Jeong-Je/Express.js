const express = require('express');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const router = express.Router();

const app = express();


router.post('/', async(req, res) => {
    if(!(req.session.user)){
      const userEmail = req.body.email;
      const authCode = crypto.randomBytes(3).toString('hex');

      console.log(authCode);

      req.session.user = {
        authCode: authCode,
        authorized : true,
      }
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

      let cnt = 1;
      res.render('main', {cnt: cnt, userEmail: userEmail});
    }else{
      const userEmail = req.body.email;
      const authCode = req.body.authCode;
      if(authCode == req.session.user.authCode){
        console.log(`인증성공`);
        let cnt = 2;
        res.render('main', {cnt: cnt, userEmail: userEmail});

      }else{
        console.log(`인증코드 불일치`);
        let cnt = 1;
        res.render('main', {cnt: cnt, userEmail: userEmail});
      }
    }


});



module.exports = router;