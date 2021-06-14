const { timeStamp } = require('console');
const express = require('express');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');

let users = [
    {
        userId: uuidv4(),
        username: 'dginos',
        name: 'Dustin',
        email: 'dustin@email.com',
        age: '29'
    },
    {
        userId: uuidv4(),
        username: 'diego3',
        name: 'Diego',
        email: 'diego@email.com',
        age: '7'
    }
];

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/create', (req, res) => {
    const user = {userId: uuidv4(), username: req.body.username, name: req.body.name, email: req.body.email, age: req.body.age}
    users.push(user);
    res.redirect('/table');
});

app.get('/table', (req, res) => {
    res.render('users', {
        users: users
    });
});

app.get('/edit/:userId', (req, res) => {
    let userId = req.params.userId;
    let userInfo = getUsers(userId);
    res.render('editIndex', {
        usernameField: userInfo[0],
        nameField: userInfo[1],
        emailField: userInfo[2],
        ageField: userInfo[3],
        userId: userId
    });
});

app.post('/edit/:userId', (req, res) => {
    let userId = req.params.userId;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
            users[i].username = req.body.username;
            users[i].name = req.body.name;
            users[i].email = req.body.email;
            users[i].age = req.body.age;
        }
    }
    res.redirect('/table');
});

app.post('/table', (req, res) => {
    let userId = req.body.userId;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
            users.splice(i, 1);
        }
    }
    res.redirect('/table');
});

function test()
{
    console.log("In test")
}

function getUsers(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === id) {
            let currentUser = [users[i].username, users[i].name, users[i].email, users[i].age]
            return currentUser;
        }
    }
}

app.listen(3000, () => {
    console.log('listening on port 3000');
});