const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: '',
    },
    categories: {
        type: Array,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);