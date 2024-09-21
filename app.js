const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();


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


app.listen(3000)