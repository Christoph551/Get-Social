// May need a variable as an array for the user's friends?
const { Types } = require('mongoose');

// User.js in models has username, email, thoughts and friends
const names = [
    'Chris Simmonds', // [0]
    'Kammie Loya', // [1]
    'Jim Jeffries', // [2]
    'Anthony Matynka', // [3]
    'Dannielle Green', // [4]
]

// required field
const usernames = [
    'ChrisS', // [0]
    'KammieL', // [1]
    'JimJ', // [2]
    'AnthonyM', // [3]
    'DannielleG', // [4]
]

// required field
const email = [
    'chris@email.com', // [0]
    'kammie@email.com', // [1]
    'jim@email.com', // [2]
    'anthony@email.com', // [3]
    'dannielle@email.com', // [4]
]

// trying to set up each line in an array is the same index throughout
const thoughts = [
    'Just ordered some wireless headphones and blue-light glasses!', // [0]
    'My dog goes absolutely nuts when it rains. So much for sleep...', // [1]
    'Coming to a city near you! Check out the calendar and pick up your tickets to see me live.', // [2]
    'Ohio is waaaay too cold sometimes. I miss Arizona.', // [3]
    'Taking my daughter to the Renaissance Festival for her 11th birthday. I may be more excited than her!', // [4]
]

// Should accept up to 280 characters
const reactions = [
    {reactionId: new Types.ObjectId(), username:'AnthonyM', reactionBody: 'Right on! The glasses should help you sleep better.'}, // [0]

    {reactionId: new Types.ObjectId(), username: 'DannielleG', reactionBody: 'Hahaha! My dog wigs out with wind and rain too. The struggle is real.'}, // [1]

    {reactionId: new Types.ObjectId(), username: 'ChrisS', reactionBody: 'Just picked up my ticket to see the show. I cannot wait!'}, // [2]

    {reactionId: new Types.ObjectId(), username: 'JimJ', reactionBody: 'Yea, Arizona is pretty legit. Never had to shovel snow a day in my life.'}, // [3]

    {reactionId: new Types.ObjectId(), username: 'AnthonyM', reactionBody: 'Ooo, very cool! Can I come?'}, // [4]
]


// Function to get all users
function getUsers() {
    return names.map((name, index) => ({
        name,
        username: usernames[index],
        email: email[index],
    }));
}

// Function to get all thoughts
function getThoughts() {
    return thoughts.map((thoughtText, index) => ({
        thoughtText,
        // reactions: []
        reactions: [reactions[index]],
    }));
}

module.exports = {
    getUsers,
    getThoughts,
}
