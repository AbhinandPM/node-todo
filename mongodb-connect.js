const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

let mongoOptions = { useNewUrlParser: true };

MongoClient.connect(url, mongoOptions, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
   /*  insertTodo(db, () => {
        client.close();
    }); */
    findDocuments(db, (todos) => {
        console.log(JSON.stringify(todos, undefined, 2));
        client.close();
    })
});

const insertTodo = (db, callback) => {
    const todos = db.collection('todos');
    todos.insertOne({ 
        text: 'Something to do.',
        completed: false
    }, (err, results) => {
        if(err) {
            console.log('Unable to insert todo: '+err);
        }
        console.log(JSON.stringify(results));
    }) 
};

const findDocuments = (db, callback) => {
    const todos = db.collection('todos');
    todos.find({}).toArray((err, todo) => {
        console.log(todo);
        callback(todo);
    });
}