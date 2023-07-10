var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mysql = require('mysql2');
var jwt = require('jsonwebtoken');
const os = require('os');
const secret = 'Login-2023'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});
app.use(cors())
app.get('/get', jsonParser, function (req, res, next) {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const interfaceName in interfaces) {
      const networkInterface = interfaces[interfaceName];
      for (const { address, family } of networkInterface) {
        if (family === 'IPv4' && !address.startsWith('127.')) {
          addresses.push(address);
          res.json({ status: 'ok',address })

        }
      }
    }
})
app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        console.log(hash);
        connection.query(
            'SELECT * FROM users WHERE  email  = ?   ', [req.body.email],
            function (err, users, fields) {
                if (err) {
                    res.json({ status: 'Error', message: err })
                    console.log(fields);
                }
                if (users.length == 0) {
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
                if (users.length != 0) {

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
            if (users.length == 0) {
                res.json({ status: 'Error', message: 'No users found' })

            }
            if (users.length != 0) {
                bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {

                    if (isLogin) {

                        var token = jwt.sign({ email: users[0].email }, secret);
                        res.json({ status: 'Sucess', message: 'Login Success', token })
                    } else {
                        res.json({ status: 'Error', message: 'Password is incorrect' })

                    }


                });
            }


        }
    );
 
})
app.post('/users', jsonParser, function (req, res, next) {
    connection.query(
        'SELECT id,email,fname,lname FROM users WHERE  email  = ?  ', [req.body.email],
        function (err, users, fields) {
            if (err) {
                res.json({ status: 'Error', message: err })
            }
            
                res.json({ status: 'Sueecss', message: users })

          
          


        }
    );
 
})
app.put('/update', jsonParser, function (req, res, next) {
    connection.query(
        'UPDATE  users SET  fname  = ?,lname = ? WHERE id =?  ', [req.body.fname,req.body.lname,req.body.id],
        function (err, users, fields) {
            if (err) {
                res.json({ status: 'Error', message: err })
            }
            
                res.json({ status: 'Sueecss', message: users })

          
          


        }
    );
 
})
app.post('/authen', jsonParser, function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({ status: 'Sucess', decoded })
    } catch (err) {
        res.json({ status: 'Error', message: err.message })

    }

})
app.listen(3333, jsonParser, function () {
    console.log('Server Runing on port 3333')
})