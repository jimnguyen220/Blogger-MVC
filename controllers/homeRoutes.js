const router = require('express').Router();

router.get('/', async(req, res) => {
    //this will send the renderd Handlebars.js template from the views folder back as the response
    res.render('homepage');
});

module.exports = router;