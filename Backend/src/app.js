// Create Server
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const authroutes = require('./Routes/auth.routes')
const foodroutes = require('./Routes/food.routes')

const app = express()

app.use(cors({
    origin : ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials : true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send('Server started')
})

app.use('/api/auth',authroutes);
app.use('/api/food',foodroutes);

module.exports = app;

