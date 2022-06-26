const { redirect } = require('express/lib/response');
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
        connection.query('SELECT * FROM department', (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.render('department/department',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

exports.form = (req, res) =>{
    res.render('department/add-department');   
}

//Add New department
exports.create = (req, res) =>{
    const {name} = req.body;
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);        
        //User this connection
        connection.query('INSERT INTO department set departmentName = ?',[name], (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.redirect('/department');
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

//Edit department
exports.edit = (req, res) =>{
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);    
        //User this connection
        connection.query('SELECT * FROM department where id = ?',[req.params.id], (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.render('department/edit-department',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

//Update department
exports.update = (req, res) =>{
    const {name} = req.body;
    pool.getConnection((err, connection)=>{
        if(err) throw err; //not connected
        console.log('Connected as ID' +  connection.threadId);    
        //User this connection
        connection.query('UPDATE department set departmentName = ? where id = ?',[name,req.params.id], (err, rows)=>{
            // When done with the connection, release it
            connection.release;    
            if(!err){
                res.redirect('/department');
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
        connection.query('DELETE FROM department where id = ?',[req.params.id], (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.redirect('/department');
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
        connection.query('SELECT * FROM department where id = ?', [req.params.id], (err, rows)=>{
            // When done with the connection, release it
            connection.release;

            if(!err){
                res.render('department/view-department',{rows});
            }else{
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}