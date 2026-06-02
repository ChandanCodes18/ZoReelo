import React  from 'react'
import './App.css'
import Approutes from './routes/Approutes'
import { CartProvider } from './context/CartContext'

function App() {

  return(
    <CartProvider>
      <Approutes />
    </CartProvider>
  )
}

export default App
