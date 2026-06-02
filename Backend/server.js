//Start Server

const app = require('./src/app')
const mongodb = require('./src/db/db')
require('dotenv').config()


// Connecting DB
mongodb()

app.listen(3000,()=>{
    console.log("Server Started")
})
