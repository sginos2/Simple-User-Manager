const express = require('express');
const path = require('path');
const app = express();

let randomId = Math.ceil(Math.random() * 100); 

var usersObj = {users:[
    {
        userId: randomId,
        username: 'dginos',
        name: 'Dustin',
        email: 'dustin@email.com',
        age: '29'
    },
    {
        userId: randomId,
        username: 'diego3',
        name: 'Diego',
        email: 'diego@email.com',
        age: '7'
    }
]};

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/users/create', (req, res) => {
    const user = {userId: randomId, username: req.body.username, name: req.body.name, email: req.body.email, age: req.body.age}
    usersObj.users.push(user);
    console.log(req.body.username);
    res.redirect('/users/table');
});

app.get('/users/table', (req, res) => {
    res.render('users', {
        users: usersObj.users
    });
});

app.get('users/edit/:userId', (req, res) => {
    let userId = req.params.userId;
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});