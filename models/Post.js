const mongoose = require('mongoose');
const { Schema } = mongoose;


const PostSchema = new Schema({
    title: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    }
})

module.exports = mongoose.model("Post",PostSchema)