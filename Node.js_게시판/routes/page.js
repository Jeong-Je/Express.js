const express = require('express');
const Sequelize = require('sequelize');
const { User } = require('../models');
const { Post } = require('../models');

const router = express.Router();


router.get('/:id?', async (req, res) => {
    let pageNum = req.params.id || 1;
    const postsPerPage = 20;
    const offset = (pageNum -1) * postsPerPage;
    
    const totalPosts = await Post.count();
    const MaxPageNum = totalPosts - offset;

    const dataForPaging = [pageNum,totalPosts, MaxPageNum];

    const posts = await Post.findAll({
        include: [{
            model: User,
        }],
        attributes: [
            'title','id',
            [Sequelize.fn('date_format', Sequelize.col('Post.created_at'), '%y년%m월%d일%H시%i분'), 'formattedDate']
        ],
        offset,
        limit: postsPerPage,
        order: [['created_at','DESC']]
    });

    if(req.session.user){
        res.render('post_list', { posts : posts, dataForPaging: dataForPaging, username: req.session.user.username});
    }else{
        res.render('post_list', { posts : posts, dataForPaging: dataForPaging, username: "로그인x"});
    }
})
  

module.exports = router;