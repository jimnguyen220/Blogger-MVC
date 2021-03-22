const router = require('express').Router();

router.get('/', async(req, res) => {
    //this will send the renderd Handlebars.js template from the views folder back as the response
    
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;