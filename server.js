var mysql = require('mysql');
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcryptjs = require('bcryptjs');
const spawn = require("child_process").spawn;
const { exec } = require('child_process');

// exec('python3 Text_Gen.py', (err, stdout, stderr) => {
//   if (err) {
//     console.error(`exec error: ${err}`);
//     return;
//   }
// 
//   console.log(`Number of files ${stdout}`);
// });
// var myPythonScriptPath = 'Text_Gen.py';

// Use python shell
// var PythonShell = require('python-shell');
// var pyshell = PythonShell.run(myPythonScriptPath);

// pyshell.on('message', function (message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });

// end the input stream and allow the process to exit
// pyshell.end(function (err) {
//     if (err){
//         throw err;
//     };
// 
//     console.log('finished');
// });

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hallucinators',
    password: 'hallucinators',
    database: 'hallucinators'
})

// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected...')
// })

var app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/client'));



app.post('/check', (req, res) => {
    LNO = req.body.LNO;
    console.log(LNO);
    // console.log(LNO);
    try {
        connection.connect((err) => {
            if (!err) {
                console.log("done!")
                connection.query('select * from vehicles where license like \'' + LNO + '\';', (err, rows, fields) => {
                    connection.end
                    if (!err) {
                        if (rows.length && rows[0].due_amount != null) {
                            console.log("found" + rows[0].due_amount)
                            res.render('index.hbs', {
                                amount: rows[0].due_amount
                            })
                        } else res.render('index.hbs', {
                            amount: 'License Number Does Not Exist in Record!!'
                        })
                    } else throw Error(e)
                })
            } else
                throw Error(err)
        })
    } catch (e) {
        console.log(e)
        res.send('Internal Server Error!')
    }
});

app.all('/photo', async (req, res) => {
    LNO = req.body.LNO;
    console.log(LNO);
    // console.log(LNO);
    try {
        exec('python3 Text_Gen.py', (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            return;
          }
        
          console.log(`${stdout}`);
          res.render('toll_index.hbs',{
              number:stdout,
              fee:100
          });
        });
        // new Promise((resolve, reject) => {
            // const pythonProcess = spawn('python3', ["Text_Gen.py"], {shell: true, stdio: 'inherit'});
            // pythonProcess.stdout.on('data', (data) => {
            //   console.log(`Number of files ${data}`);
            //   res.send(`${data}`)
            // });
        //     resolve(pythonProcess)
        // }).then((result) => {
        //     console.log(result)
        //     res.send(result)
        // })
        // pythonshell.run('Text_Gen.py', options, function (err, results) {
        //     if (err) throw err;
        //     // results is an array consisting of messages collected during execution
        //     console.log('results: %j', results);
        // });
    } catch (e) {
        console.log(e)
        res.send('Internal Server Error!')
    }
});

// app.get('/tolllogin', (req, res) => {
//     res.render('toll_login.hbs', {});
// })

app.get('/toll', (req, res) => {
    res.render('index.hbs', {
        number: "GJ-05-1996"
    });
});

app.post('/store',(req,res)=> {
    number = req.body.number,
    fee = req.body.fee
    try {
        connection.connect((err) => {
            if (!err) {
                console.log("connected!")
                connection.query('update vehicles set due_amount = due_amount+'+fee+' where license like \'' + number + '\';', (err, rows, fields) => {
                    connection.end
                    if (!err) {
                        res.render('result.hbs', null)
                    } else throw Error(e)
                })
            } else
                throw Error(err)
        })
    } catch (e) {
        console.log(e)
        res.send('Internal Server Error!')
    }
})

app.listen(3000, (err, res) => {
    if (!err)
        console.log("connected to port 3000");
})
