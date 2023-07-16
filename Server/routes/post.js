const router = require('express').Router();
const User = require('../models/User');
const Post = require('./../models/Post');

//create Post
router.post('/', async (req, res) => {
    const nwPost1 = new Post(req.body);
    try {
        const nwPost2 = await nwPost1.save();
        res.status(200).json(nwPost2);
    } catch (err) {
        res.status(500).json(err);
    }
});

//edit Post
router.put('/:id', async (req, res) => {
    try {
        const ePost = await Post.findById(req.params.id);
        if (ePost.username === req.body.username) {
            const upPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true, });
            res.status(200).json(upPost);
        }
        else {
            res.status(500).json("You can not edit this post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete Post
router.delete('/:id', async (req, res) => {
    try {
        const dPost = await Post.findById(req.params.id);
        if (!dPost)
            return res.status(500).json("No such post found");
        if (dPost.username === req.body.username) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted Successfully");
        }
        else
            res.status(500).json("You can delete this post");
    } catch (err) {
        res.status(500).json(err);
    }
});

//get post by postId
router.get('/:id', async (req, res) => {
    try {
        const gPost = await Post.findById(req.params.id);
        if (!gPost)
            return res.status(500).json("No such Post found");
        res.status(200).json(gPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all post of all user
//get all post by category
//get all posts by username
router.get('/?', async (req, res) => {
    const username = req.query.user;
    const catname = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username: username });
        }
        else if (catname) {
            posts = await Post.find({
                categories: {
                    $in: [catname],
                }
            })
        }
        else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;