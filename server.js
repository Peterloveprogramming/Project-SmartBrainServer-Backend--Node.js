const express = require("express");
const bodyParser = require("body-parser")
const bcrypt = require('bcryptjs');
var cors = require('cors')
const knex = require('knex')
const register = require('./Controller/register');
const signin = require('./Controller/signin')
const image = require('./Controller/image')
const profile = require('./Controller/profile')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
  client: 'pg',
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});




const app = express();

app.use(cors())



app.use(bodyParser.json())


app.get("/",(req,res)=>{
	res.json("success")
})

app.post("/signin",signin.handleSignin(db,bcrypt))
app.post("/register",(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.profileHandler(req,res,db)})
app.put('/image',(req,res)=>{image.imageHandler(req,res,db)}) 
app.post('/imageURL',(req,res)=>{image.APIhandler(req,res)})  
app.listen(process.env.PORT || 3000,()=>{
	console.log(`it is running on port ${process.env.PORT}`)
})

/* 
"/" => res = this is working 
"/signin" =>post = success/fail .. post is more secured than get... 
"/register" =>post = user 
"/profile/:userid" =>get = user .. get the information of the user 
"/image" => post = user ... update the levels of the user 


*/