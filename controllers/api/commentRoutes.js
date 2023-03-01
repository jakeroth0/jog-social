const router = require("express").Router();
const sequelize = require("sequelize");
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

module.exports = router;

// // POST a new comment
// router.post('/new', withAuth, async (req, res) => {
//     if (!req.session.logged_in) {
//         res.redirect('/');
//     } else {
//         try {
//             const commentData = await Comment.create({
//                 ...req.body,
//                 user_id: req.session.user_id,
//                 post_id: req.params.id
//             },
//             {
//                 include: [
//                     {
//                         model: User,
//                         attributes: ['username', 'id']
//                     },
//                     {
//                         model: Post
//                     }
//                 ]
//             });
//             res.status(200).json(commentData);
//         } catch (err) {
//             res.status(400).json(err);
//         }
//     }
// })