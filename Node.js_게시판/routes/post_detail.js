const express = require('express');
const Sequelize = require('sequelize');
const { User } = require('../models');
const { Post } = require('../models');

const app = express();
const router = express.Router();


router.get('/:id', async(req, res) => {
    const id = req.params.id;
    // console.log(id);
    const post = await Post.findOne({
        include: [{
            model: User,
        }],
        attributes: [
            'title', 'content',
            [Sequelize.fn('date_format', Sequelize.col('Post.created_at'), '%y년%m월%d일%H시%m분'), 'formattedDate']
        ],
        where: {
            id: id,
        }
    })
    // console.log(post);
    res.render('post_detail', { post : post });
})

module.exports = router;