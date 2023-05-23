const express = require('express');

const crypto = require('crypto') //비밀번호 암호화를 위해 crypto 모듈을 불러옴 

const router = express.Router();

const { User  } = require('../models');

router.get('/', (req, res) => {
    res.render('register');
})

router.post('/', async (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    const pwd2 = req.body.pwd2;

    if(pwd != pwd2){ //입력한 두 비밀번호가 일치하지 않는 경우 
        res.send(
            `<script>
                alert('입력한 두 비밀번호가 일치하지 않습니다.');
                document.location.href="/register"; //다시 회원가입 창으로 이동
            </script>`
        )
    }else{ //입력한 두 비밀번호가 일치하는 경우 
        const searchUser = await User.findOne({ // 입력한 아이디를 mysql내에서 검색 
            attributes : ['username'],
            where : {
                username : username,
            }
        })
        

        if(searchUser === null){
            console.log('사용 가능한 아이디입니다.');
            // 암호화에 쓰일 salt에 랜덤한 숫자를 저장
            let salt = Math.round((new Date().valueOf()*Math.random())) + ""; 
            //pwd와 salt를 합쳐서 비밀번호를 암호화 
            let hashPassword = crypto.createHash("sha512").update(pwd + salt).digest("hex"); 
            User.create({
                username : username,
                password : hashPassword, //암호화된 비밀번호를 mysql에 저장
                salt : salt, //로그인할 때 다시 salt가 다시 사용되므로 salt도 mysql에 저장
            })
            res.send(
                `<script>
                alert('회원가입이 완료되었습니다 !');
                document.location.href="/login"; //로그인 창으로 이동
                </script>`
            )
        }else{
            console.log(`${searchUser.username}는 이미 존재하는 아이디`); 
            res.send(
                `<script>
                alert('이미 존재하는 아이디입니다.');
                document.location.href="/register"; //다시 회원가입 창으로
                </script>`
            )
        }

    }
})

module.exports = router;