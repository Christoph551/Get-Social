const { Schema, model } = require('mongoose');

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        text: String,
        username: String,
        reactions: [{ type: Schema.Types.ObjectId, ref: 'reaction' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize our thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;