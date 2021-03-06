const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

let { mongoose} = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');  

const port = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }
    Todo.findById(id)
        .then((todo) => {
            if(!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        })
        .catch((err) => {
            res.status(404).send({});
        })
});

app.listen(port, () => {
    console.log(`app started listerning in port ${port}....`);
});

module.exports = { app };