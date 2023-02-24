// Including boilerplate code for the server
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`You are now connected to the server on port ${PORT}!`);
    });
});
