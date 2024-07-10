const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const port = 3000;
const app = express();

// Middleware for parsing JSON body
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended:true }));

// MongoDB connection
const connectionString = 'mongodb+srv://zawwar1313:SKemd6qGp8cvc3BT@cluster0.yf0z8hu.mongodb.net/user?retryWrites=true&w=majority';
const databaseName = 'user';
const collectionName = 'users';
const secretKey = 'my_secret_key'; // Set your secret key

app.get('/LoginJwtGenereate' , async (req,res) =>{
res.sendFile(path.join(__dirname , '..', 'frontend' , 'login.html'));
});

app.post('/login' , async(req,res) => {
const client = new MongoClient(connectionString, { useNewUrlParser: true , useUnifiedTopology: true });
await client.connect();
const database = client.db(databaseName);
const collection = database.collection(collectionName);
const { email , password } = req.body
const result = await collection.findOne({email});
if(!result){
    res.status(500).send('Error Occur While Login');
}else{
    // const token = jwt.sign({},secretKey, {expiresIn:'1m'});  // agar huma token ma sirf intial data aur expiry data show karni ha to token ma {},seceretKey,{expiresIn:'1m'}means 1 vala khali churdaga{}
    const token = jwt.sign({email,password:result.email,password},secretKey,{expiresIn:'1h'}); //aur agar email , password bhi show karana ha token ma jis sa login kia ha to uskaliye asa likha ga ({email,password:result.email,password},secretKey,{expiresIn:'1h'})
    console.log(token);
    res.json(token);
}
});

app.listen(port , ()=>{
console.log('Your Server Is Running on port')
});