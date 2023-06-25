const express = require('express');

const { Post } = require('../models');
const { User } = require('../models');

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

router.post('/', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const id = await User.findOne({
        attributes: ['id'],
        where: {
            username: req.session.user.username,
        }
    })

    const createdPost = await Post.create({
        title: title,
        content: content,
        poster: id.id,
    })

    res.redirect(`/post_detail/${createdPost.id}`);
})

module.exports = router;