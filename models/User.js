const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            max_length: 50,
        },
        // Must match a valid email address. (Look into Mongoose's matching validation - https://mongoosejs.com/docs/validation.html)
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

const User = model('user', userSchema);

module.exports = User;

// Referenced mongoose.js documentation @ https://mongoosejs.com/docs/guide.html