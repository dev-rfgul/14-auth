const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const bcrypt = require('bcrypt');


app.use(cookieParser());
app.get('/', (req, res) => {

    //setting up cookie 
    res.cookie('name', 'expressssss')
    res.send('Cookie has been set');

})
app.get('/read', (req, res) => {


    res.send('this is read page');
    /// to read the cookie we can use req.cookie and to send the cookie we can use res.cookie
    console.log(req.cookies);

})

app.get('/password', (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash("password", salt, function (err, hash) {
            console.log(hash);
            res.send(hash);
            // Store hash in your password DB.
        });
    });
})

app.get('/compare', (req, res) => {
    bcrypt.compare('password', '$2b$10$8Y2g5IP.Gw1fJ8N/b9J4ReOUfrzlT3NOlKd5pDAtiSLh/ktszb7tq', function (err, result) {
        if (result == true) {
            res.send('password matched');
        }
        else {
            res.send('password not matched');
        }
    });
})


app.listen(3000)