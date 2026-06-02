const mongoose = require('mongoose')

const PartnerSchema = new mongoose.Schema({
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    restaurantName:{
        type:String,
        required:true
    },
    OwnerName:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    CuisineType:{
        type:String,
        required:true
    }
},
{
    timestamps: true
})

const PartnerModel = mongoose.model('Partner',PartnerSchema)

module.exports = PartnerModel