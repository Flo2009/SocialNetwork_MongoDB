const { Schema, Types } = require('mongoose');

// Define the reaction schema
const reactionSchema = new Schema({

  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  username: {
    type: String,
    required: true
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString() // format the timestamp
  }
});

module.exports = reactionSchema;
