const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            ref: 'thoughts',
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
        text: String,
        username: { 
            type: String, 
            required: true 
        },
        reactions: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'reactions', 
        }],
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
const Thought = model('thought', thoughtSchema);
const Reaction = model('reaction', reactionSchema);

// Created a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactionBody;
});

// Exporting both Thought and Reaction models.
module.exports = {
    Thought,
    Reaction,
};