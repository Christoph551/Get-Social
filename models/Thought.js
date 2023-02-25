const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Types.ObjectId, 
            default: () => new Types.ObjectId(),
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
            get: createdAt => dayjs(createdAt).format('MMM DD, YYYY [at] h:mm:ss a')
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
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
            get: createdAt => dayjs(createdAt).format('MMM DD, YYYY [at] h:mm:ss a')
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
            getters: true,
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