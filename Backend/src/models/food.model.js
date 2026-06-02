const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Video:{
        type: String,            // We will only save the file url in db
        required: true
    },
    description:{
        type:String
    },
    price:{
        type: Number,
        required: true
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner"
    }
})

const FoodModel = mongoose.model("Food",foodSchema)

module.exports = FoodModel
