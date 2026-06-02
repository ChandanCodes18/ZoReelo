const express = require('express')
const foodController = require('../controller/food.controller')
const authmiddleware = require('../middlewares/auth.middleware')
const router = express.Router()
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
})
// This should add a food item to the database , so only food partner can access this api . 
// This should be protected 

/* POST /api/food [Protected] */    
router.post('/',
    authmiddleware.authFoodPartnerMiddleware ,
    upload.single("Video"),
    foodController.createFood
)

/* GET /api/food [Protected]*/
router.get('/',
    authmiddleware.authUserMiddleware,
    foodController.getFoodItems
)

module.exports = router
