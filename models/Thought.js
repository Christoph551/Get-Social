const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            default: () => new Schema.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
        }
    },
);

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
        }, 
        username: { 
            type: String, 
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


// Initialize our thought schema
const Thought = model('thoughts', thoughtSchema);
// const Reaction = model('reactions', reactionSchema);

// Created a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Exporting Thought model.
module.exports = {
    Thought
};