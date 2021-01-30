const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    type: {
      type: String,
      enum: ['coffee_shop', 'bookstore']
    }
  },
  {
    timestamps: true
  }
);
