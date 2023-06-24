const express = require('express');


const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.user){
        res.render('post_upload');
    }else{
        res.send(`<script>
        alert('로그인이 필요한 서비스입니다.');
        document.location.href='/';
        </script>
        `)
    }
})

module.exports = router;