const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

var validator = require('validator');

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
//redirects view to login.html
app.get('/login', (req, res) => {
    res.sendFile('login.html',{root: __dirname});
});


app.post('/login', (req, res) => {
   
    console.log(req.body.userid);
    console.log(req.body.pwd);
    //check if the username is admin and password is Admin@123
    if(req.body.userid=='admin'&&req.body.password=='Admin@123')
    {
        console.log("Succesfully Logged In!!");
        res.redirect('/admin');
    }
    else{ 
        console.log("Wrong username or password.");
        res.end("Wrong username or password.");
    }
});

//redirects view to admin.html
app.get('/admin', (req, res) => {
    res.sendFile('admin.html',{root: __dirname});
});


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));