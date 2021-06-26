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

const userData = mongoose.model('User', userSchema);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/create', (req, res) => {
    userData.insertOne({
        "firstName": `${req.body.firstName}`, 
        "lastName": `${req.body.lastName}`, 
        "email": `${req.body.email}`, 
        "age": `${req.body.age}`
    });
    res.redirect('/table');
});

app.get('/table', (req, res) => {
    userData.find({}, (err, data)=> {
        if (err) return console.log(`Oops! ${err}`);
        res.render('users', {
            users: data
        });
    });
});

app.get('/edit/:_id', (req, res) => {
    let userId = req.params._id;
    let userInfo = getUsers(userId);
    console.log(userInfo);
    res.send(userInfo);
});

app.post('/edit/:userId', (req, res) => {
    let userId = req.params._id;
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
    let userId = req.body._id;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
            users.splice(i, 1);
        }
    }
    res.redirect('/table');
});

function getUsers(id) {
    userData.find({_id: `${id}`}, (err, data) => {
        if (err) return console.log(`Oops! ${err}`);
        console.log(data);
        return(data);
    });
}

app.listen(4000, () => {
    console.log('listening on port 4000');
});

// let users = [
//     {
//         firstName: 'Daenerys',
//         lastName: 'Targaryen',
//         email: 'dragonmom@email.com',
//         age: '24'
//     },
//     {
//         firstName: 'Tom',
//         lastName: 'Riddle',
//         email: 'slytherinrules@email.com',
//         age: '71'
//     },
//     {
//         firstName: 'Frodo',
//         lastName: 'Baggins',
//         email: 'mrunderhill@email.com',
//         age: '51'
//     },
//     {
//         firstName: 'Loki',
//         lastName: 'Laufeyson',
//         email: 'gloriouspurpose@email.com',
//         age: '1054'
//     },
//     {
//         firstName: 'Obi-Wan',
//         lastName: 'Kenobi',
//         email: 'hellothere@email.com',
//         age: '47'
//     },
//     {
//         firstName: 'Johanna',
//         lastName: 'Mason',
//         email: 'treessuck@email.com',
//         age: '24'
//     },
//     {
//         firstName: 'Fitzwilliam',
//         lastName: 'Darcy',
//         email: 'mostardently@email.com',
//         age: '28'
//     },
//     {
//         firstName: 'Jack',
//         lastName: 'Sparrow',
//         email: 'hidetherum@email.com',
//         age: '28'
//     },
//     {
//         firstName: 'Jean-Luc',
//         lastName: 'Picard',
//         email: 'starfleetflautist@email.com',
//         age: '32'
//     },
//     {
//         firstName: 'Ben',
//         lastName: 'Wyatt',
//         email: 'lowcalcalzonezone@email.com',
//         age: '43'
//     }
// ];