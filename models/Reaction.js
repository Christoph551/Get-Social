const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        text: String,
        username: String,
    },
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;