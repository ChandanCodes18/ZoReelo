const foodModel = require('../models/food.model')
const storageServices = require('../services/storage.services')
const {v4: uuid} = require('uuid')

async function createFood(req,res){
    const price = Number(req.body.Price || req.body.price)

    if(!req.file){
        return res.status(400).json({
            message: "Video file is required"
        })
    }

    if(!req.body.Name || Number.isNaN(price) || price <= 0){
        return res.status(400).json({
            message: "Name and valid price are required"
        })
    }
    
    const fileUploadResult = await storageServices.uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModel.create({
        Name: req.body.Name,
        Video: fileUploadResult ,
        description: req.body.Description,
        price,
        foodPartner: req.foodPartner._id
    }) 
    res.status(201).json({
        message: "Food Item created",
        Food : foodItem
    })
}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({}).populate("foodPartner")

    res.status(200).json({
        message:"Food items fetched successfully !",
        foodItems
    })
}

module.exports = {
    createFood,
    getFoodItems
}
