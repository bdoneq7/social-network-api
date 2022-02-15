const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // Must be between 1 and 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      // Array of nested documents created with the reaction Schema
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


ThoughtSchema.virtual('reactionCount').get(function() {
  return this.replies.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
