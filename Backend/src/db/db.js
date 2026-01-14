const mongoose = require('mongoose')

function ConnectDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Database connected')
    })
    .catch((error)=>{
        console.log('There are errors',error)
    })
}

module.exports = ConnectDB