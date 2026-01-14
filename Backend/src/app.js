// Create Server
const express = require('express')
const mongodb = require('./db/db')
const cookieParser = require('cookie-parser')

const authroutes = require('./Routes/auth.routes')
const foodroutes = require('./Routes/food.routes')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('Server started')
})

app.use('/api/auth',authroutes);
app.use('/api/food',foodroutes);

module.exports = app;

