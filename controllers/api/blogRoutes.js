const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth')

//creates a new blog post
router.post('/', withAuth, async(req, res) => {
    try {
        const dbBlogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(dbBlogData);
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(400).json({message: 'No blog post found with this id'});
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;