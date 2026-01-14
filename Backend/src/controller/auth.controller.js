const usermodel = require('../models/user.model')
const foodPartnerModel = require('../models/partner.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUSer(req,res){

    const {Fullname, Email, Phone, Password} = req.body

    const Userexist = await usermodel.findOne({
        email: Email
    })
    if(Userexist){
        return res.status(400).json({
            message:'User already exists'
        })
    }

    const hashPass = await bcrypt.hash(Password,10);

    const NewUSer = await usermodel.create({
        Fullname: Fullname,
        Email: Email,
        Phone: Phone,
        Password:hashPass
    })

    const token = jwt.sign({
            id : NewUSer._id           // only id used cuz thats the only unique thing in the user data
    }, process.env.JWT_SECRET)

    res.cookie('token',token)

    // Once all things are final we can give a confirmation message to the frontend that the user is generated successfully 
    res.status(201).json({
        message:"User registered successfully",
        user:{
            _id : NewUSer._id,
            Fullname : NewUSer.Fullname,
            Email : NewUSer.Email 
        }
    })
}

async function LoginUser(req,res){
    const {Email , Password} = req.body

    const user = await usermodel.findOne({
        Email
    })

    if(!user){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }
    const ValidPass = await bcrypt.compare(Password, user.Password)

    if(!ValidPass){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            Email: user.Email,
            Fullname: user.Fullname
        }
    })
} 

function LogoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User Logged out successfully "
    })
}

async function registerFoodPartner(req,res){

    const { Name, Email, Password} = req.body
    const userexist = await foodPartnerModel.findOne({
        Email
    })

    if(userexist){
        return res.status(400).json({
            message: "Food Partner already exist"
        })
    }

    const hashPass = await bcrypt.hash(Password,10)

    const FoodPartner = await foodPartnerModel.create({
        Name ,
        Email,
        Password : hashPass
    })

    const token = jwt.sign({
        id: FoodPartner._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"Food Partner successfully registered",
        FoodPartner:{
            Name: FoodPartner.Name,
            Email: FoodPartner.Email,
            id: FoodPartner._id
        }
    })
}

async function loginFoodPartner(req,res) {
    const {Email,Password} = req.body;

    const user = await foodPartnerModel.findOne({
        Email
    })

    if(!user){
        res.status(400).json({
            message:"The Food Partner doesnt exist"
        })
    }
    const ValidPass = await bcrypt.compare(Password,user.Password)

    if(!ValidPass){
        return res.status(400).json({
            message: "Invalid Password or Email"
        })
    }

    const token =  jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(200).json({
        message: "User successfully logged in",
        FoodPartner: {
            Email: user.Email,
            Name: user.Name
        }
    })
}

function logoutFoodPartner(req,res){

    res.clearCookie("token")
    res.status(200).json({
        message:"The Food Partner is successfully logged out"
    })
}

module.exports = {
    registerUSer,
    LoginUser,
    LogoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}