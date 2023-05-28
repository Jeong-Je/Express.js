const express = require('express');
const { User } = require('../models');
const { Post } = require('../models');

const app = express();
const router = express.Router();


router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        include: [{
            model: User,
        }]
    });

    // console.log(posts[0].dataValues.title);

    res.render('post_list', { posts : posts});
})

module.exports = router;