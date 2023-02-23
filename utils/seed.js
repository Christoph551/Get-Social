const connection = require('../config/connection');
const { User } = require('../models');
// Import the data from the data folder
const  { getUsers, getThoughts }  = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected Successfully!');
    // Performing the deleteMany function as to not repeatedly seed the same information
    await User.deleteMany({});

    // Calling getUsers and getThoughts functions that were imported from data.js
    const users = getUsers();
    const thoughts = getThoughts();

    // After deleting previous data from any prior server sessions, seed the corresponding data again
    await User.insertMany(users, thoughts);

    // Log the data to the console to show relationships 
    console.table(users);
    console.table(thoughts);

    console.info('Aaaaaaand we are seeded!');
    process.exit();
})
