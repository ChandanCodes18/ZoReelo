const mongoose = require('mongoose')

const PartnerSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true 
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const PartnerModel = mongoose.model('Partner',PartnerSchema)

module.exports = PartnerModel