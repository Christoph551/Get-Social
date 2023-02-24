const mongoose = require('mongoose');

// Added strictQuery to prevent deprecation warnings
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/Get-Social', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;