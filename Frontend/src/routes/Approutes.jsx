import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from '../pages/auth/UserLogin';
import UserRegister from '../pages/auth/UserRegister';
import PartnerLogin from '../pages/auth/PartnerLogin';
import PartnerRegister from '../pages/auth/PartnerRegister';
import Home from '../pages/general/home';
import CreateFood from '../pages/general/CreateFood'
import PartnerStore from '../pages/general/PartnerStore'
import CartDrawer from '../components/CartDrawer'

const Approutes = () => {
  return (
    <Router>
      <CartDrawer />
      <Routes>
        <Route path='/user/register' element={<UserRegister />} />    
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/food-partner/register' element={<PartnerRegister />} />
        <Route path='/food-partner/login' element={<PartnerLogin />} />
        <Route path='/' element ={<Home/>}></Route>
        <Route path='/create-food' element ={<CreateFood/>}></Route>
        <Route path='/store/:partnerId' element ={<PartnerStore/>}></Route>
      </Routes>
    </Router>
  )
}

export default Approutes
