const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

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
        console.log(req, res);
        res.status(200).json({ name: 'Alice main one' })
    }
);
let i = 0;
const users = ['One', 'Two'];
app.get('/hi', (req, res) => {
        res.status(200).json({ name: "hi Alice", age : 29, height: 170 })
    }
);
app.post('/hi', (req, res) => {
        res.status(200).json({ users: users, m: 'post'})
    }
);
app.put('/hi', (req, res) => {
        res.status(200).json({ users: users, m: 'put'})
    }
);
app.patch('/hi', (req, res) => {
        res.status(200).json({ users: users, m: 'patch'})
    }
);
app.delete('/hi', (req, res) => {
        res.status(200).json({ users: users, m: 'delete'})
    }
);

app.post('/', (req, res) => {
    setTimeout(
        () => res.status(200).json({ message: 'Hello ' + req.body.name }),
        4000
    )
});


app.listen(PORT, () => console.log('SERVER WORKS3343243'));