const router = require('express').Router();
const loginAuthenticate = require('../utils/auth')

router.get('/', loginAuthenticate, async(req, res) => {
    //this will send the renderd Handlebars.js template from the views folder back as the response
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/login', (req, res) => {
    // if user is logged in, this will redirect to root file, otherwise, will render the login handlebar
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup')
})

module.exports = router;