const express = require('express')
const Userauth = require('../controller/auth.controller')

const router = express.Router()

router.post('/user/register',Userauth.registerUSer)
router.post('/user/login',Userauth.LoginUser)
router.get('/user/logout',Userauth.LogoutUser)

router.post('/food-Partner/register',Userauth.registerFoodPartner)  
router.post('/food-Partner/login',Userauth.loginFoodPartner)
router.get('/food-Partner/logout',Userauth.logoutFoodPartner)

module.exports = router