const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
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

/*
Need to figure out the relationship between the user and their own thoughts, vs the reaction to someone else's thought.
*/

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
        },
        username: { 
            type: String, 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
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