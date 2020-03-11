const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const index = express();
//const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '030589',
    database: 'crudnodjs'

});
connection.connect(function (error) {
    if (!!error)
        console.log(error);
    else
        console.log('database created');
});

//set views file
index.set('views', path.join(__dirname, 'views'));
//set views engine
index.set('view engine', 'ejs');
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false }))

index.get("/", (req, res) => {
    // res.send("crud node js")
    let sql = "SELECT * FROM users";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;

        res.render('user_index', {
            title: 'crud node js and mysql',
            users: rows
        });
    });
});

//add user
index.get("/add", (req, res) => {
    //res.send("add new user!!")
    res.render('user_add',
        {
            title: 'crud node js and mysql'
        });
});

index.post("/save", (req, res) => {
    let data = { nomcomplet: req.body.nomcomplet, email: req.body.email, tel: req.body.tel };
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect("/")
    });
});

index.get("/edite/:userId", (req, res) => {
    const userId = req.params.userId;
    let sql = `SELECT * From users Where id = ${userId}`;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.render('user_edite', {
            title: 'crud node js and mysql',
            user: results[0]
        });
    });
});

index.post("/update", (req, res) => {
    // let data = { nomcomplet: req.body.nomcomplet, email: req.body.email, tel: req.body.tel };
    const userId = req.body.id;
    let sql = "update users SET nomcomplet='" + req.body.nomcomplet + "',email='" + req.body.email + "',tel='" + req.body.tel + "'where id=" + userId;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect("/")
    });

});

index.get("/delete/:userId", (req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE From users Where id = ${userId}`;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect("/")
    });

})


index.listen(3000, () => {
    console.log('server is running');

})