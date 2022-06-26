const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser')
const upload = multer();
const path = require('path');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.port || 3001;

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

// Parse application/json
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Templating Engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

//Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// Connect to DB
pool.getConnection((err, connection)=>{
    if(err) throw err; //not connected
    console.log('Connected as ID' +  connection.threadId);
});

// Router
const department = require('./server/routes/department');
app.use('/', department )
const employee = require('./server/routes/employee');
app.use('/', employee);

app.use('/', (req,res)=>{
    res.render('home');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
