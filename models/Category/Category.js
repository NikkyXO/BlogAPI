const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
  },
  {
    timestamps: true
  }
);

// compile the comment model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
