const foodModel = require('../models/food.model')
const storageServices = require('../services/storage.services')
const {v4: uuid} = require('uuid')

async function createFood(req,res){
    
    const fileUploadResult = await storageServices.uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModel.create({
        Name: req.body.Name,
        Video: fileUploadResult ,
        description: req.body.Description,
        foodPartner: req.foodPartner._id
    }) 
    res.status(201).json({
        message: "Food Item created",
        Food : foodItem
    })
}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({})

    res.status(201).json({
        message:"Food items fetched successfully !",
        foodItems
    })
}

module.exports = {
    createFood,
    getFoodItems
}