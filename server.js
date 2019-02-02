var mongoose = require('mongoose');
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');


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
 })

 app.listen(3000,(err,res) => {
     if(!err)
     console.log("connected to port 3000");
 })