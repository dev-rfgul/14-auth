const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

app.get('/jwt', (req, res) => {
    let token = jwt.sign({ email: "raofahadgul785@gmail.com" }, "secret");
    //the sceret is most most imp and we need to keep it secret in any case and mostly it is not in the plain text 
    res.cookie('jwt', token);



    res.send("the token has been set in the cookies");
})
app.get('/jwtread', (req, res) => {

    console.log(req.cookies);
    res.send(req.cookies);
    // we can read the specific cookie as well like this 
    console.log(req.cookies.jwt);


})
app.get('/jwtverify', (req, res) => {
    // we can verity the token like this 

    let data = jwt.verify(req.cookies.jwt, "secret")
    res.send(data)
    console.log(data);
})

app.listen(3000)