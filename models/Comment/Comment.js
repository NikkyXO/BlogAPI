const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    }
  },
  {
    timestamps: true
  }
);

// compile the comment model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
