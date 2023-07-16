const router= require('express').Router();
const User= require('./../models/User');
const bcrypt= require('bcrypt');

//register
router.post('/register', async (req, res)=>{
    try{
        const salt= await bcrypt.genSalt(10);
        req.body.password= await bcrypt.hash(req.body.password, salt);
        const user= new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        const newUser= await user.save();
        res.status(200).json(newUser);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//login
router.post('/login', async (req, res)=>{
    try{
        const user= await User.findOne({username: req.body.username});
        if(!user){return res.status(500).json("Wrong Credential");}
        const validate= await bcrypt.compare(req.body.password, user.password);
        if(!validate){return res.status(500).json("Wrong Password")};
        const {password, ...other}= user._doc;
        res.status(200).json(other);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports= router;