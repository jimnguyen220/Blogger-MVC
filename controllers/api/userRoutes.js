const router = require('express').Router();
const { User } = require('../../models');


//creates a new user
router.post('/signup', async (req, res) => {
    try {
        const userData =  await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});



//if user is already created, login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            res.status(400).json({message: 'Incorrect username or password.  Please try again'});
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: 'Incorrect username or password.  Please try again'});
            return;
        }
        
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            
            res.status(200).json({user: dbUserData, message: 'You are now logged in!'});
        })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;