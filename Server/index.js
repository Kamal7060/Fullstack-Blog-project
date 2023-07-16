const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute= require('./routes/auth');
const userRoute= require('./routes/user');
const postRoute= require('./routes/post');
const catRoute= require('./routes/category');
const multer= require('multer');
const path= require('path');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongoDB");
}).catch((err) => {
    console.log(err);
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '/images')));

//setting storage settings
const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images');
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name);
    }
})

//building middleware
const upload= multer({storage: storage});

//setting middleware
app.post('/server/upload', upload.single('file'), (req, res)=>{
    res.status(200).json("File has been uploaded");
});

app.use('/server/auth', authRoute);
app.use('/server/user', userRoute);
app.use('/server/post', postRoute);
app.use('/server/cat', catRoute);

app.listen('5000', () => {
    console.log("Backend is running");
});

