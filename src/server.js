 const express = require('express');
 const mysql = require('mysql2');
 const bodyParser = require('body-parser');
 const cors = require('cors');

 const app = express();
 app.use(cors());
 app.use(bodyParser.json());
 
 const port = 5500;

 const db = mysql.createConnection(
   { host: 'localhost',
    user: 'root',
    password: 'root@1234',
    database: 'glvcdb'
   }
 );

 db.connect(
    err=>{
        if(err){
            console.error('Connection not established with database', err);
        }
        else{
            console.log('Sucessfully connected to the Database');
        }
    }
 );

 //insert into client_info values(name, email, address, password);
 app.post('/registration',(req,res)=>{
    // console.log('Received data:', req.body);
    const {name,email,address,password} = req.body;
    const checkQuery = 'select * from client_info where email = ?';
    db.query(checkQuery,[email],(err,result) => {
        if(err){
            console.error('Error checking existing user', err);
            res.status(500).json({error:'An error occurred while checking the client details'});
        }else if(result.length > 0){
            res.status(400).json({ message: 'User already exists' });
        }else {
            const insertQuery = 'INSERT INTO client_info (name, email, address, password) VALUES (?, ?, ?, ?)';
            db.query(insertQuery,[name,email,address,password],(err,result)=>{
                if(err){
                    console.error('Error in adding the client details', err);
                    res.status(500).json({error:'An error occurred while adding the client details'});
                }else{
                    res.status(200).json({message:'Registration successful'});
                }
            });
        }
    }); 
 });

 app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    const query = 'select id, name from client_info where email=? and password=?';
    db.query(query,[email,password],(err,result)=>{
        if(err){
            console.error('Error verifying user credentials',err);
            res.status(500).json({error:'An error occured'});
        }else{
            const user = result[0];
            res.status(200).json({
                message:'Login successful',
                name: user.name,
                clientId: user.id});
        }
    });
 });

 app.post('/scheduler',(req,res)=>{
    const {topic,nPeople,time,clientId} = req.body;
    const query = 'insert into meeting_info (topic,npeople,time,client_id) values (?,?,?,?)'
    db.query(query,[topic,nPeople,time,clientId], (err,result)=>{
        if(err){
            console.error('Error scheduling meeting:',err);
            res.status(500).json({error:'An error occured'});
        }else{
            res.status(200).json({message:'Meeting scheduled successfully'});
        }
    });
 });

app.get('/view/:clientId',(req,res) =>{
    const clientId = req.params.clientId;
    const query = 'select * from meeting_info where client_id = ?';
    db.query(query,[clientId],(err,result)=>{
        if(err){
            res.status(500).json({error:'Error in fetching the meeting details'});
        }else{
            res.status(200).json(result);
        }
    });
});

 app.listen(port,()=>{console.log('Server established on port: ',port)});