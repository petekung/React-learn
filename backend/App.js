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
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        connection.query(
            'SELECT * FROM users WHERE  email  = ?   ', [req.body.email,req.body.fname],
            function (err, users, fields) {
                if (err) {
                    res.json({ status: 'Error', message: err })
                    console.log(fields);
                }
                if(users.length == 0 ){
                    connection.query(
                        'INSERT INTO users (email,password,fname,lname) VALUES (?,?,?,?)', [req.body.email, hash, req.body.fname, req.body.lname],
                        function (err, results, fields) {
                            if (err) {
                                res.json({ status: 'Error', message: err })
                                return
                            }
            
                            res.json({ status: 'Sucess' })
                        }
                    );    
                } 
                if(users.length != 0){
                   
                    res.json({ status: 'Error', message: 'Email Already' })

                }
           
    
    
            }
        );
  
    });

})
app.post('/login', jsonParser, function (req, res, next) {
    connection.query(
        'SELECT * FROM users WHERE  email  = ?  ', [req.body.email],
        function (err, users, fields) {
            if (err) {
                res.json({ status: 'Error', message: err })
               
            }
            if(users.length == 0 ){
                res.json({ status: 'Error', message: 'No users found ' })

            }
            if (users.length !=0) {
                bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {

                    if (isLogin) {

                        var token = jwt.sign({ email: users[0].email }, secret);
                        res.json({ status: 'Sucess', message: 'Login Sucess ', token }) 
                    } else {
                        res.json({ status: 'Error', message: 'Password is incorrect ' })

                    }
                 

                });
            }


        }
    );

})
app.post('/Authen', jsonParser, function (req, res, next) {




})
app.listen(3333, jsonParser, function () {
    console.log('Server Runing on port 3333')
})