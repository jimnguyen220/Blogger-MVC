const router = require('express').Router();
const loginAuthenticate = require('../utils/auth');
const { User, Blog } = require('../models');


router.get('/', loginAuthenticate, async(req, res) => {
    //this will send the renderd Handlebars.js template from the views folder back as the response
   try {
    //Get all blog posts and joins with user data
    const blogData = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            }
        ],
    });

    //serializes data so we can use it
    const blogs = blogData.map((blog) => blog.get({plain: true}));
    console.log(blogs);
    res.render('homepage', {
        loggedIn: req.session.loggedIn, 
        blogs
    });
   } catch (err) {
       res.status(500).json(err);
   }
   

});

router.get('/blog/:id', async (req, res) => {
    try{
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });
        
        const blog = blogData.get({plain: true});
        console.log(blog)
        res.render('blog', {
            ...blog,
            loggedIn: req.session.loggedIn
        })

    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/login', (req, res) => {
    // if user is logged in, this will redirect to root file, otherwise, will render the login handlebar
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});


router.get('/signup', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;