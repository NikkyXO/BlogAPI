const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Post title is reguired"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Post description is reguired"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Post description is reguired"],
        ref: "Category"
    },
    numViews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    user: {
        type: String,
        required: [true, "Author is reguired"],
        ref: "User"
    },

    photo: {
        type: String,
        required: [true, "Post Image is reguired"]
    },
    
  },
  {
    timestamps: true,
  }
);

// compile the post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
