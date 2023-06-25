const express = require('express');
const Sequelize = require('sequelize');
const { User } = require('../models');
const { Post } = require('../models');
const { Comment } = require('../models');

const app = express();
const router = express.Router();


router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const post = await Post.findOne({
        where: {
            id: id,
        },
        include: [{
            model: User,
        }],
        attributes: [
            'id','title', 'content',
            [Sequelize.fn('date_format', Sequelize.col('Post.created_at'), '%y년%m월%d일%H시%i분'), 'formattedDate']
        ],
    })
    const username =  post.User.dataValues.username
    const comment = await Comment.findAll({
        where: {
            postId : id,
        },
        include: [{
            model: User,
        }],
        attributes: [
            'commenter',
            'content',
            [Sequelize.fn('date_format', Sequelize.col('Comment.created_at'), '%y년%m월%d일%H시%i분'), 'formattedDate']
        ]
    })

    if(comment){
        res.render('post_detail', { post : post, username: username, comment: comment });
    }else{
        res.render('post_detail', { post : post, username: username });
    }
})

module.exports = router;