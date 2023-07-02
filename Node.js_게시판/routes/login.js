const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.user){
        res.send(`<script>
        alert('잘못된 접근입니다.');
        </script>`)
    }else{
        res.render('login');
    }
})

router.post('/', async (req, res) => {
    const id = req.body.id;
    const pwd = req.body.pwd;

    const user = await User.findOne({
        attributes: ['username', 'password'],
        where: {
            username :id,
        }
    })

    if(user == null){
        res.send(`<script>
        alert('존재하지 않는 아이디입니다.');
        document.location.href='/login';
        </script>`)
    }else{
        if(pwd == user.password){
            req.session.user = {
                username: user.username,
                authorized: true,
            }
            res.redirect('/');
        }else{
            res.send(`<script>
            alert('비밀번호를 다시 확인해주세요.');
            document.location.href='/login';
            </script>`)
        }
    }
})

module.exports = router;