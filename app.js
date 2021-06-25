const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testUser', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we connected to mongo!');
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: String
});

const courseSchema = new mongoose.Schema({
    Course: String,
    Title: String,
    Credits: Number
})

const userData = mongoose.model('User', userSchema);

let users = [
    {
        firstName: 'Daenerys',
        lastName: 'Targaryen',
        email: 'dragonmom@email.com',
        age: '24'
    },
    {
        firstName: 'Tom',
        lastName: 'Riddle',
        email: 'slytherinrules@email.com',
        age: '71'
    },
    {
        firstName: 'Frodo',
        lastName: 'Baggins',
        email: 'mrunderhill@email.com',
        age: '51'
    },
    {
        firstName: 'Loki',
        lastName: 'Laufeyson',
        email: 'gloriouspurpose@email.com',
        age: '1054'
    },
    {
        firstName: 'Obi-Wan',
        lastName: 'Kenobi',
        email: 'hellothere@email.com',
        age: '47'
    },
    {
        firstName: 'Johanna',
        lastName: 'Mason',
        email: 'treessuck@email.com',
        age: '24'
    },
    {
        firstName: 'Fitzwilliam',
        lastName: 'Darcy',
        email: 'mostardently@email.com',
        age: '28'
    },
    {
        firstName: 'Jack',
        lastName: 'Sparrow',
        email: 'hidetherum@email.com',
        age: '28'
    },
    {
        firstName: 'Jean-Luc',
        lastName: 'Picard',
        email: 'starfleetflautist@email.com',
        age: '32'
    },
    {
        firstName: 'Ben',
        lastName: 'Wyatt',
        email: 'lowcalcalzonezone@email.com',
        age: '43'
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
    // const user = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, age: req.body.age}
    

    db.userData.insertOne({
        "firstName": req.body.firstName, 
        "lastName": req.body.lastName, 
        "email": req.body.email, 
        "age": req.body.age
    });
    res.redirect('/table');
});

app.get('/table', (req, res) => {
    userData.find({}, (err, data)=> {
        if (err) return console.log(`Oops! ${err}`);
        let result = JSON.stringify(data);
        console.log(`data = ${result}`);
    });

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