const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const connectionString = 'mongodb+srv://zawwar1313:SKemd6qGp8cvc3BT@cluster0.yf0z8hu.mongodb.net/user?retryWrites=true&w=majority';
const databaseName = 'user';
const SignupcollectionName = 'JobsSignup';
const AllJobscollectionName = 'AllJobs';
const ApplyJobscollectionName = 'ApplyJobs';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

/// ALL File Router Means Ka Is link pa Ye file Server ho.
///////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static(path.join(__dirname ,'..', 'frontend'))); /// agar pori file chal rahi ho lakin images show nahi ho rahi ho to us ka liye ye lagayen ga.

app.get('/LatestJobs' , async (req , res) =>{
    res.sendFile(path.join(__dirname , '..', 'frontend', 'JobsShow.html'));
});
app.get('/OTP', async (req, res) => {
    res.sendFile(path.join(__dirname , '..', 'frontend', 'otp.html'));  ///'..', 'frontend', 
});
app.get('/Apply' , async (req , res) =>{
    res.sendFile(path.join(__dirname , '..', 'frontend', 'Apply.html'));
});
app.get('/Signup', async (req , res) =>{
res.sendFile(path.join(__dirname , '..' ,'frontend', 'Signup.html'))
});
app.get('/Home' , async (req , res) =>{
    res.sendFile(path.join(__dirname , '..', 'frontend', 'index.html'));
});
app.get('/PostaJob' , async (req , res) =>{
    res.sendFile(path.join(__dirname , '..', 'frontend', 'PostJob.html'));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Apply
app.post('/Apply' , async (req , res) => {
    try{
const client = new MongoClient(connectionString, {useNewUrlParser: true , useUnifiedTopology:true});
await client.connect();
const database = client.db(databaseName);
const collection = database.collection(ApplyJobscollectionName);
const dataToInsert = req.body;
const result = await collection.insertOne(dataToInsert);
res.json(result);
    }catch(error){
        console.log('error');
        res.status(500).send('error');
    }
});

/// Signup
app.post('/Signuppp' , async (req , res) => {
    try{
const client = new MongoClient(connectionString, {useNewUrlParser: true , useUnifiedTopology:true});
await client.connect();
const database = client.db(databaseName);
const collection = database.collection(SignupcollectionName);
const dataToInsert = req.body;
const result = await collection.insertOne(dataToInsert);
res.json(result);
    }catch(error){
        console.log('error');
        res.status(500).send('error');
    }
});

// SHOW AND DISPLAY DATA
app.get('/DisplayAllJobs', async (req, res) => {
    try {
        const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(AllJobscollectionName);
        const result = await collection.find().toArray();
        res.json(result);
    } catch (error) {
        console.error('error');
        res.status(500).send('Error');
    }
});
 
// INSERT DATA 
app.post('/postaJob' , async (req, res) =>{
    try{
const client = new MongoClient(connectionString, {useNewUrlParser: true , useUnifiedTopology : true });
await client.connect();
const database = client.db(databaseName);
const collection = database.collection(AllJobscollectionName);
const dataToInsert = req.body;
const result = await collection.insertOne(dataToInsert);
res.json(result);
    }catch(error){
        console.log('error');
        res.status(500).send('error');
    }
});

// PORT
app.listen(port ,()=>{
    console.log('Your Server is Running');
});
