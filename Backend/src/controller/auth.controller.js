const usermodel = require('../models/user.model')
const foodPartnerModel = require('../models/partner.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUSer(req,res){
    try {
        const {name, email, phone, password} = req.body

        const Userexist = await usermodel.findOne({
            Email: email
        })
        if(Userexist){
            return res.status(400).json({
                message:'User already exists'
            })  
        }

        const hashPass = await bcrypt.hash(password, 10);

        const NewUSer = await usermodel.create({
            Fullname: name,
            Email: email,
            Phone: phone,
            Password: hashPass
        })

        const token = jwt.sign({
                id : NewUSer._id
        }, process.env.JWT_SECRET)

        res.cookie('token', token)

        res.status(201).json({
            message:"User registered successfully",
            user:{
                _id : NewUSer._id,
                Fullname : NewUSer.Fullname,
                Email : NewUSer.Email 
            }
        })
    } catch(error) {
        console.error('Registration error:', error)
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        })
    }
}

async function LoginUser(req,res){
    try {
        // Accept both lowercase (from frontend) and PascalCase field names
        const {email, password, Email, Password} = req.body
        
        const userEmail = Email || email;
        const userPassword = Password || password;

        if(!userEmail || !userPassword) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        const user = await usermodel.findOne({
            Email: userEmail
        })

        if(!user){
            return res.status(400).json({
                message:"Invalid Email or Password"
            })
        }
        
        const ValidPass = await bcrypt.compare(userPassword, user.Password)

        if(!ValidPass){
            return res.status(400).json({
                message:"Invalid Email or Password"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(200).json({
            message:"User logged in successfully",
            user:{
                Email: user.Email,
                Fullname: user.Fullname
            }
        })
    } catch(error) {
        console.error('Login error:', error)
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        })
    }
} 

function LogoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User Logged out successfully "
    })
}

async function registerFoodPartner(req,res){

    const {
        Email,
        email,
        Password,
        password,
        restaurantName,
        OwnerName,
        ownerName,
        Phone,
        phone,
        Address,
        address,
        CuisineType,
        cuisineType,
    } = req.body;

    const partnerEmail = Email || email;
    const partnerPassword = Password || password;
    const partnerOwnerName = OwnerName || ownerName;
    const partnerPhone = Phone || phone;
    const partnerAddress = Address || address;
    const partnerCuisineType = CuisineType || cuisineType;

    // Validate required fields
    if (!partnerEmail || !partnerPassword || !restaurantName || !partnerOwnerName || !partnerPhone || !partnerAddress || !partnerCuisineType) {
        return res.status(400).json({
            message: "Missing required fields",
        });
    }

    try {
        const userexist = await foodPartnerModel.findOne({ Email: partnerEmail });

        if (userexist) {
            return res.status(400).json({
                message: "Food Partner already exists",
            });
        }

        const hashPass = await bcrypt.hash(partnerPassword, 10);

        const FoodPartner = await foodPartnerModel.create({
            Email: partnerEmail,
            Password: hashPass,
            restaurantName,
            OwnerName: partnerOwnerName,
            Phone: partnerPhone,
            Address: partnerAddress,
            CuisineType: partnerCuisineType,
        });

        const token = jwt.sign({
            id: FoodPartner._id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(201).json({
            message: "Food Partner successfully registered",
            token,
            FoodPartner: {
                OwnerName: FoodPartner.OwnerName,
                Email: FoodPartner.Email,
                id: FoodPartner._id,
                RestaurantName: FoodPartner.restaurantName,
                PhoneNumber: FoodPartner.Phone,
                Address: FoodPartner.Address,
                CuisineType: FoodPartner.CuisineType,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
}

async function loginFoodPartner(req,res) {
    try {
        const { Email, email, Password, password } = req.body;

        const partnerEmail = Email || email;
        const partnerPassword = Password || password;

        if (!partnerEmail || !partnerPassword) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await foodPartnerModel.findOne({
            Email: partnerEmail
        })

        if(!user){
            return res.status(400).json({
                message:"Invalid Password or Email"
            })
        }

        const ValidPass = await bcrypt.compare(partnerPassword,user.Password)

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
            message: "Food Partner successfully logged in",
            token,
            FoodPartner: {
                Email: user.Email,
                OwnerName: user.OwnerName,
                id: user._id,
                RestaurantName: user.restaurantName,
                PhoneNumber: user.Phone,
                Address: user.Address,
                CuisineType: user.CuisineType,
            }
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
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
