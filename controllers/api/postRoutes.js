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
            const userData = await User.findByPk(req.session.user_id, {
                attributes: {exclude: ['password']},
                include: [
                    {
                        model: Post,
                        attributes: ['post_title', 'post_date'],
                    }
                ]
            })
            const post = postData.get({ plain: true });
            const user = userData.get({ plain: true })
            const user_id = user.id;
            console.log(post);
            res.render('onepost', {
                post,
                user_id,
                user,
                logged_in: true
            })
            // res.status(200).json(postData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
})

// POST a new blog post
router.post('/new', withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
    } else {
        try {
            const postData = await Post.create({
                ...req.body,
                user_id: req.session.user_id // Add the user_id from the session to the new post data
            }, {
                include: [
                    {
                      model: User,
                      attributes: {include: ['username']},
                    }
                ]
            });
            res.status(200).json(postData);
        } catch (err) {
            res.status(400).json(err);
        }
    }
})

// GET edit post form page
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      // Find the post by id

      const postData = await Post.findByPk(req.params.id, {
        attributes: ['post_title', 'post_text', 'post_date', 'id'],
        include: [
        {
            model: User,
            attributes: ['username','id']
        }, 
        {
            model: Comment,
            attributes:['comment_text', 'comment_date'],
            include: [
                {
                    model: User,
                    attributes: ['username','id'],
                    nested: true
                }],
                nested: true
                // these nested's may need to be removed
        }]
    });
    const post = postData.get({ plain: true });
      // this fetches all users
      
      console.log('the post.post_id is below-------');
      console.log(post.id);
      console.log(post.user.id)
      console.log('above is the post.user.id__________')
      // Check if the logged in user is the owner of the post
      if (post.user.id !== req.session.user_id) {
        res.status(403).json({ message: 'You are not authorized to edit this post.' });
        return;
      }
      const user_id =req.session.user_id;
      // Render the edit post form
      res.render('editpost',
       { post,
        user_id,
        logged_in: true
     });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// // PUT update post
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//       // Find the post by id
//       const postData = await Post.findByPk(req.params.id);
      
//       // Check if the logged in user is the owner of the post
//       if (postData.user_id !== req.session.user_id) {
//         res.status(403).json({ message: 'You are not authorized to edit this post.' });
//         return;
//       }
      
//       // Update the post with the new data
//       await postData.update({
//         post_title: req.body.post_title,
//         post_text: req.body.post_text
//       });
      
//       // Redirect to the updated post
//       res.redirect(`/posts/${req.params.id}`);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

  // PUT update post
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
      const post = postData.get({ plain: true });
      const userData = await User.findByPk(req.session.user_id);
      const user = userData.get({ plain: true });
      const user_id = user.id;
      console.log('this is the user')
      console.log(user);
      console.log('this is the post')
      console.log(post);
      if (!post) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      if (post.user_id !== req.session.user_id) {
        res.status(403).json({ message: 'You do not have permission to edit this post!' });
        return;
      }
      const updatedPost = await Post.update({
        post_title: req.body.post_title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id,
        },
      }
      );

      res.render('onepost', {
        post,
        user,
        user_id,
        logged_in: true
      });
      // res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;