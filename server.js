var mysql = require('mysql');
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcryptjs = require('bcryptjs');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hallucinators',
  password: 'hallucinators',
  database: 'hallucinators'
})


 var app = express();
 app.set('view engine','hbs');
 app.use(bodyParser.urlencoded({ extended: true })); 
 app.use(express.static(__dirname + '/client'));



 app.post('/check',(req,res) => {
     LNO=req.body.LNO;
     console.log(LNO);
     // console.log(LNO);
     try {
        connection.connect((err) => {
            if (!err) {
                console.log("done!")
                connection.query('select * from vehicles where license like \''+LNO+'\';', (err, rows, fields) => {
                    connection.end
                    if (!err) {
                        if (rows.length && rows[0].due_amount != null) {
                            console.log("found"+rows[0].due_amount)
                            res.render('index.hbs', {amount: rows[0].due_amount})
                        } else res.render('index.hbs', {amount: 'License Number Does Not Exist in Record!!'})
                    } else throw Error(e)
                })
            } else
            throw Error(err)
        })
    } catch (e) {
        console.log(e)
        res.sendFile('Internal Server Error!')
    }
 });

app.get('/tolllogin',(req,res) => {
    res.render('toll_login.hbs',{});
})

app.post('/login',(req,res) => {
    id=req.body.toll_LoginId;
    password=req.body.password;
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(password,salt,(err,hash) => {
            password=hash;
            next();
        });
    });
})

 app.get('/toll',(req,res) => {
     res.render('toll_index.hbs',{
         number:"GJ-05-1996",
         fee:"120"
     });
 })

 app.listen(3000,(err,res) => {
     if(!err)
     console.log("connected to port 3000");
 })
