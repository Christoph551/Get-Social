const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Must match a valid email address. https://mongoosejs.com/docs/validation.html
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                'Please fill a valid email address',
            ],
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

const User = model('users', userSchema);

// Create a virtual called friendCount that retrieves the length of the user's friends array on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = User;

// Referenced mongoose.js documentation @ https://mongoosejs.com/docs/guide.html