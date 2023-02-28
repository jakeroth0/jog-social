const router = require("express").Router();
const sequelize = require("sequelize");
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');
const { User, Comment, Post } = require("../../models");

// GET one post
router.get('/:id', withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
    } else {
        try {
            const postData = await Post.findByPk(req.params.id, {
                attributes: ['post_title', 'post_text', 'post_date'],
                include: [
                {
                    model: User,
                    attributes: ['username']
                }, 
                {
                    model: Comment,
                    attributes:['comment_text', 'comment_date'],
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                            nested: true
                        }],
                        nested: true
                        // these nested's may need to be removed
                }]
            });
            const post = postData.get({ plain: true });
            console.log(post);
            res.render('onepost', {
                post,
                logged_in: true
            })
            // res.status(200).json(postData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
})

module.exports = router;