var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mysql = require('mysql2');
var jwt = require('jsonwebtoken');
const secret = 'Login-2023'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});
app.use(cors())
app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.query(
            'INSERT INTO users (email,password,fname,lname) VALUES (?,?,?,?)',[req.body.email,hash,req.body.fname,req.body.lname],
            function (err, results, fields) {
                if(err){
                    res.json({status:'Error' ,message:err})
                    return
                }
                res.json({ status:'Sucess' })
            }
        );
    });

})
app.post('/login', jsonParser, function (req, res, next) {
    connection.query(
        'SELECT * FROM users WHERE email = ?',[req.body.email],
        function (err, users, fields) {
            if(err){
                res.json({status:'Error' ,message:err}) 
                return
            }
            if(users.length == 0){
                res.json({status:'Error' ,message:'No user found'}) 
            }
            bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
                if(isLogin){
                    res.json({status:'Sucess' ,message:'Login Sucess '})
                }else{
                    res.json({status:'Error' ,message:'Login Failed '}) 

                }
            });
         
        }
    );

})
app.listen(3333, jsonParser, function () {
    console.log('CORS-enabled web server listening on port 3333')
})