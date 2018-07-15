const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/TodoApp';

const options = {
    useNewUrlParser: true
}

mongoose.Promise = global.Promise;
mongoose.connect(url, options);

module.exports = { mongoose };