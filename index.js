const express = require('express');
const bodyParser = require('body-parser');
const mongoConnection = require('./db').mongoConnection;
const bookSchema = require('./bookModel');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

mongoConnection();

app.use((req, res, next) => {
    // eslint-disable-line consistent-return
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.get('/', (req, res) => {
        res.status(200).json({ name: 'Alice main one  next try' })
    }
);

let users = [
    {id:1, name: 'Alice'},
    {id:2, name: "Bob"},
    {id: 3, name : 'John'}
    ];

app.get('/hi', (req, res) => {

        bookSchema
            .find()
            .exec()
            .then(docs => {
                res.status(200).json(docs)
            }).catch(err => {
            res.status(400).json('ERROR', err)
        })

    }
);

app.post('/hi', (req, res) => {
        const book = new bookSchema({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name
        });

        book
            .save()
            .then(() => {
                res.status(201).json('OK');
            })
            .catch(err => {
                res.status(500).json('ERR');
            });
    }
);




app.put('/hi', (req, res) => {
        res.status(200).json({ users: users, m: 'PUT'})
    }
);

app.patch('/hi', (req, res) => {
        res.status(200).json({ users: users, m: 'PATCH'})
    }
);

app.delete('/hi', (req, res) => {
        const id = req.body.id;
        users = users.filter(el => el.id !== id);
        res.status(200).json({ users: users, m: 'DELETE'})
    }
);

app.post('/', (req, res) => {
    setTimeout(
        () => res.status(200).json({ message: 'Hello ' + req.body.name }),
        4000
    )
});

app.listen(PORT, () => console.log('SERVER WORKS'));



