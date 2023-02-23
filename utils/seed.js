const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
// Import the data from the data folder
// const  /* ... */  = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected Successfully!');
    // Performing the deleteMany function as to not repeatedly seed the same information
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    // functions not yet written in data.js file
    // const users = getUserName();
    // const thoughts = getUserThought();
    // const reactions = getUserReaction();

    // After deleting previous data from any prior server sessions, seed the corresponding data again
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    await Reaction.collection.insertMany(reactions);

    console.table(users);
    console.table(thoughts);
    console.table(reactions);

    console.info('Aaaaaaand we are seeded!');
    process.exit();
})
