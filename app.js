const express = require('express');
const path = require('path');
const fs = require('fs');
const file = fs.createWriteStream('./users.json');
const app = express();
const { v4: uuidv4 } = require('uuid');

let users = [
    {
        userId: uuidv4(),
        firstName: 'Dustin',
        lastName: 'Ginos',
        email: 'dustin@email.com',
        age: '29'
    },
    {
        userId: uuidv4(),
        firstName: 'Diego',
        lastName: 'Ginos',
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
    const user = {userId: uuidv4(), firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, age: req.body.age}
    users.push(user);
    fs.writeFile('./users.json', JSON.stringify(users), function(err){
        if(err)
        {
            res.redirect('/table');
        }
    });
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
        firstNameField: userInfo[0],
        lastNameField: userInfo[1],
        emailField: userInfo[2],
        ageField: userInfo[3],
        userId: userId
    });
});

app.post('/edit/:userId', (req, res) => {
    let userId = req.params.userId;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
            users[i].firstName = req.body.firstName;
            users[i].lastName = req.body.lastName;
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
            let currentUser = [users[i].firstName, users[i].lastName, users[i].email, users[i].age]
            return currentUser;
        }
    }
}

app.listen(4000, () => {
    console.log('listening on port 4000');
});