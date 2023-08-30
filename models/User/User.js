const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name is required"]
    }, 
    lastname: {
        type: String,
        required: [true, "Last Name is required"]
    },
    profilePhoto: {
        type: String
    },
    email: {
        type: String,
        required: [true, "email is required"]
    }, 
    password: {
        type: String,
        required: [true, "password is required"]
    }, 
    bio: {
        type: String,
    },
    // postCount: {
    //     type: Number,
    //     default: 0
    // },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Admin", "Guest", "Editor"],
    },
    viewedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    // active: {
    //     type: Boolean,
    //     default: true
    // },
    posts: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        }
    ],
    blocked: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }
    ],

    plan: [
        {
            type: String,
            enum: ["Free", "Premium", "Pro"],
            default: "Free"
        }
    ],

    award: [
        { 
            type: String,
            enum: ["Bronze", "Silver", "Gold"],
            default: "Free"
        }
    ]

  },
  {
    timestamps: true
  }
);

// compile the user model
const User = mongoose.model("User", userSchema);

module.exports = User;
