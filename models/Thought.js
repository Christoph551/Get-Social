const { Schema, model } = require('mongoose');

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
            ref: 'reaction', 
        }],
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            ref: 'thought'},
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

// Initialize our thought schema
const Thought = model('thought', thoughtSchema);

// Initialize our reaction schema
const Reaction = model('reaction', reactionSchema);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Exporting both Thought and Reaction models.
module.exports = {
    Thought,
    Reaction,
};