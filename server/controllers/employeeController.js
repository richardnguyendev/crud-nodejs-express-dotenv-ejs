const { redirect, render } = require('express/lib/response');
const mysql = require('mysql');

//Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

//View Users
exports.viewall = (req, res) =>{
    // Connect to DB
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);
        
        //User this connection
        connection.query('SELECT * FROM employee', (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.render('employee/employee',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

exports.form = (req, res) =>{
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);        
        //User this connection
        connection.query('SELECT * FROM department', (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.render('employee/add-employee',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}


//Add New Device
exports.create = (req, res) =>{
    const {departmentID,employeeName, sex, birthday, salary} = req.body;
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);
        let searchTerm = req.body.search;
        
        //User this connection
        connection.query('INSERT INTO employee set departmentID = ?,employeeName = ?, sex = ?, birthday = ?, salary = ?',[departmentID, employeeName, sex, birthday, salary], (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                //res.render('user',{ alert: 'User added sucessfully.'});
                res.redirect('/employee');
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}


//find device by departmentID
exports.find = (req, res) =>{
    // Connect to DB
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);
        let searchTerm = req.body.search;
        
        //User this connection
        connection.query('SELECT * FROM employee e inner join department d on e.departmentID = d.id where id = ? order by id', [searchTerm], (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.render('employee/employee',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

//Edit Device
exports.edit = (req, res) =>{
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);    
        //User this connection
        connection.query('SELECT * FROM employee where employeeID = ?',[req.params.id], (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.render('employee/edit-employee',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

//Update department
exports.update = (req, res) =>{
    const {departmentID,employeeName, sex, birthday, salary} = req.body;
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);    
        //User this connection
        connection.query('UPDATE employee set departmentID = ?,employeeName = ?, sex = ?, birthday = ?, salary = ? where employeeID = ?',[departmentID,employeeName,sex,birthday,salary,req.params.id], (err, rows)=>{
            // When done with the connection, release it
            connection.release;    
            if(!err){
                res.redirect('/employee');
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
               
        });
    });
 }

 
//View Detail
exports.view = (req, res) =>{
    // Connect to DB
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);
        
        //User this connection
        connection.query('SELECT * FROM employee where employeeID = ?', [req.params.id], (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.render('employee/view-employee',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

// Delete User
exports.delete = (req, res) =>{
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);    
        //User this connection
        connection.query('DELETE FROM employee where employeeID = ?',[req.params.id], (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.redirect('/employee');
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

