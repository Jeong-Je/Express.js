const express = require('express');
const { User } = require('../models');
const crypto = require('crypto'); //비밀번호 암호화를 위해 사용

const app = express();

const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.user){ //로그인 되어있으면 
        res.redirect('/main'); // 메인 페이지로
    }else{ //로그인 안되어있으면
        res.render('login'); // 로그인페이지로
    }
})

router.post('/', async (req, res) => {
    if(!req.session.user){
        const id = req.body.id;
        const pwd = req.body.pwd;

        const user = await User.findOne({
            attributes : ['username','password','salt'],
            where : {
                username : id,
            }
        })
        if(!(user === null)){  //mysql내에 존재하는 아이디일 경우
            console.log(`아이디가 ${id}인 유저의 로그인 요청`);
            //DB에 저장된 salt와 pwd을 이용하여 hashPassword 생성
            let hashPassword = crypto.createHash("sha512").update(pwd + user.salt).digest("hex");
            if(hashPassword == user.password){
                req.session.user = {
                    id : id,
                    authorized : true,
                }
                console.log(`${id}님의 로그인 성공`)
                res.redirect('/main');
            }else{
                res.send(
                    `<script>
                    alert('비밀번호를 다시 확인해주세요.');
                    document.location.href="/login"; //다시 로그인 창으로 이동
                    </script>`
                )
            }
        }else{ //myql내에 존재하지 않는 아이디일 경우 
            res.send(
                `<script>
                    alert('아이디를 다시 확인해주세요.');
                    document.location.href="/login"; //다시 로그인 창으로 이동
                </script>`
            )
        }
    }else{
        res.render('login');
    }
})

module.exports = router;