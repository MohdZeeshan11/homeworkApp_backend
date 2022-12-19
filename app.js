const express = require('express');
const connect = require('./db/connect')
const app = express();
const users= require('./routes/user');
const cors = require('cors')
// const path = require('path')
require('dotenv').config()

// middleware
app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// routes
app.use('/user', users);


// app.use(express.static(path.join(__dirname,'./client/build')))

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./client/build/index.html'))
// })

// app.get('/login',(req,res)=>{
//     console.log('login')
// })

// app.post('/registration',(req,res)=>{
//     try {
//         const password = req.body.password;
//         const email
//     } catch (error) {
        
//     }
// })

const port = process.env.PORT || 5000;

const start = async ()=>{
    try {
        await connect(process.env.DATABASE_URL);
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`)
            console.log('db connected')
        })
    } catch (error) {
        console.log(error);
    }
}
start()
