const router = require('express').Router();
const User = require('./../models/User');
const Post = require('./../models/Post');
const bcrypt = require('bcrypt');


//update password
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const user = await User.findByIdAndUpdate(req.body.userId, {
                $set: req.body,
            },{new: true,});
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else
        res.status(500).json("You can not update this account");
})

//delete account
router.delete('/:id', async (req, res)=>{
    if (req.body.userId === req.params.id) {
        try{
            const user= await User.findById(req.body.userId);
            if(!user)
                return res.status(500).json("No such user found");
            await Post.deleteMany({username: user.username});
            await User.findByIdAndDelete(req.body.userId);
            res.status(200).json("Deleted successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else
        res.status(500).json("You can not delete this account");
})


//get by name
router.get('/?', async (req, res)=>{
    const username= req.query.user;
    try{
        const user= await User.find({username: username});
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});


//get by id
router.get('/:id', async (req, res)=>{
    try{
        const user= await User.findById(req.params.id);
        if(!user)
            return res.status(500).json("No such user found");
        const {password, ...other}= user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json("No such user found");
    }
});

module.exports= router;




