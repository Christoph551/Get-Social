const connection = require('../config/connection');
const  { User, Thought }  = require('../models');
// Import the data from the data folder
const  { getUsers, getThoughts }  = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected Successfully!');
    // Performing the deleteMany function as to not repeatedly seed the same information
    await User.deleteMany({});
    await Thought.deleteMany({});

    const userThoughts = [];

    const users = getUsers();
    const thoughts = getThoughts();
    // Seeded data has only 5 entries
    for (let i = 0; i <= 4; i++) {
        
        const newThought = await Thought.create({...thoughts[i], username: users[i].username});

        userThoughts.push({
            ...users[i],
            thoughts: [newThought._id]
        })
    }
    // Calling getUsers and getThoughts functions that were imported from data.js

    // After deleting previous data from any prior server sessions, seed the corresponding data again
    await User.insertMany(userThoughts);
    // await Thought.insertMany(userThoughts)

    // This is where you will need to add the creation of adding friends. 

    // Log the data to the console to show relationships 
    console.table(userThoughts);

    console.info('Aaaaaaand we are seeded!');
    process.exit();
})
