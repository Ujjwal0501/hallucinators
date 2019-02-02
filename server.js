var mysql = require('mysql');
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hallucinators',
  password: 'hallucinators',
  database: 'hallucinators'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

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
