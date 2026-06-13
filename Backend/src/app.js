// Create Server
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const authroutes = require('./Routes/auth.routes')
const foodroutes = require('./Routes/food.routes')

const app = express()

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"]

if(process.env.FRONTEND_URL){
    allowedOrigins.push(FRONTEND_URL);
}

app.use(cors({
    origin : allowedOrigins,
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

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

module.exports = app;

