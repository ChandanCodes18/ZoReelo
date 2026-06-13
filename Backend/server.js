//Start Server

const app = require('./src/app')
const mongodb = require('./src/db/db')
require('dotenv').config()


// Connecting DB
mongodb()
const PORT = process.env.PORT || 3000;

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server Started on port ${PORT}`)
})
