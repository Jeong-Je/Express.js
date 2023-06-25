const express = require('express');
const { Comment } = require('../models');
const { User } = require('../models');
const app = express();
const router = express.Router();


router.post('/:id', async(req, res) => {
    const id = req.params.id;
    if(req.session.user){
        const content = req.body.content;
        const userId = await User.findOne({
            attributes: ['id'],
            where: {
                username: req.session.user.username,
            }
        })
        Comment.create({
            content : content,
            commenter: userId.dataValues.id,
            postId: id,
        })
        res.redirect(`/post_detail/${id}`)
    }else{
        res.send(`<script>
        alert('로그인이 필요한 기능입니다.');
        document.location.href='/post_detail/${id}';
        </script>`)
    }

})


module.exports = router;