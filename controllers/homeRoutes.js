const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET route for homepage that shows all posts if the user is logged in
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll();
        console.log('this is postData')
        console.log(postData);

        const posts = postData.map((post) => post.get({ plain: true}));
        console.log(`---------------------------------------`)
        console.log('this is posts, using the post.get({ plain: true}));')
        console.log(posts);

        // this fetches all users
        const userData = await User.findAll();
        const user = userData.map((user) => user.get({ plain: true }));
        const user_id =req.session.user_id;

        
        console.log(user_id);
        const currentuser = await User.findByPk(req.session.user_id);
        console.log(currentuser.username);
        console.log('this is currentuser.username---------------');
        
        res.render('homepage', {
            posts,
            currentuser: currentuser.username,
            user,
            user_id,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// This route is sends people home if they're already logged in and sends them to the login page if they aren't
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

  // GET new post form page
router.get('/new', async (req, res) => {
    res.render('newpost');
});

module.exports = router;