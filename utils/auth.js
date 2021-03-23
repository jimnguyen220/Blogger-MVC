//middleware to redirect to login page if user is not logged in
const loginAuthenticate = (req, res, next) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = loginAuthenticate