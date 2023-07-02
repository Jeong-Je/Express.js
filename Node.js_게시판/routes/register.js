const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.user){
        res.send(`<script>
        alert('잘못된 접근입니다.')
        documnet.location.href="/";
        </script>`)
    }else{
        res.render('register');
    }
})

router.post('/', async(req,res) => {
    const id = req.body.id;
    const pwd = req.body.pwd;
    const pwd2 = req.body.pwd2;
    if(pwd !== pwd2){
        res.send(`<script>
        alert('비밀번호가 일치하지 않습니다.');
        document.location.href='/register';
        </script>`)
    }else{
        const user =  await User.findOne({
            where: {
                username: id,
            },
        })

        if(user === null){
            console.log('사용가능한 아이디');
            User.create({
                username: id,
                password: pwd
            })
            res.send(`<script>
            alert('회원가입이 완료되었습니다.');
            document.location.href='/login';
            </script>`)
        }else{
            res.send(`<script>
            alert('이미 등록된 아이디입니다.');
            document.location.href='/register';
            </script>`)
        }
    }
})


module.exports = router;