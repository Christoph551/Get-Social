const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            max_length: 50,
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
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
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

const User = model('user', userSchema);

// Create a virtual called friendCount that retrieves the length of the user's friends array on query
userSchema.virtual('friendCount').get(function () {
    return this.friends;
});

module.exports = User;

// Referenced mongoose.js documentation @ https://mongoosejs.com/docs/guide.html