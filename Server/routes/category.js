const router= require('express').Router();
const Cat= require('./../models/Category');

//add cat
router.post('/', async (req, res)=>{
    const cat= new Cat(req.body);
    try{
        const nCat= await cat.save();
        res.status(200).json(nCat);
    }catch(err){
        res.status(500).json(err);
    }
});

//get all cat
router.get('/', async(req, res)=>{
    try{
        const cat= await Cat.find();
        res.status(200).json(cat);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports= router;