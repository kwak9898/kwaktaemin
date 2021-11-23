const mongoose = require("mongoose");

const { Schema } = mongoose;
    const postsSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        password: {
   
            type: Number && String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        //   update: {
        //     type: Date
        // }
    });

module.exports = mongoose.model("Posts", postsSchema);