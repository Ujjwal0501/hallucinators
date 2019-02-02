var mongoose = require('mongoose');
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcryptjs = require('bcryptjs');

mongoose.connect("mongodb://localhost:27017/dotslash';")

 var app = express();
 app.set('view engine','hbs');
 app.use(bodyParser.urlencoded({ extended: true })); 
 app.use(express.static(__dirname + '/client'));



 app.post('/check',(req,res) => {
     LNO=req.body.LNO;
     console.log(LNO);
     res.render('index.hbs',{
         amount:1000
     })
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