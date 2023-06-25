const express = require('express');
const Sequelize = require('sequelize');
const { User } = require('../models');
const { Post } = require('../models');

const app = express();
const router = express.Router();


router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        include: [{
            model: User,
        }],
        attributes: [
            'title','id',
            [Sequelize.fn('date_format', Sequelize.col('Post.created_at'), '%y년%m월%d일%H시%i분'), 'formattedDate']
        ]
    });
    if(req.session.user){
        res.render('post_list', { posts : posts, username: req.session.user.username});
    }else{
        res.render('post_list', { posts : posts, username: "로그인x"});
    }
})

module.exports = router;