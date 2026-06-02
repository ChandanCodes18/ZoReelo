import React from 'react'
import { useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/Home.css'

const CartDrawer = () => {
  const location = useLocation()
  const {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const showCart = location.pathname === '/' || location.pathname.startsWith('/store/')

  if (!showCart) {
    return null
  }

  return (
    <>
      <button
        className="cart-fab"
        type="button"
        onClick={() => setIsCartOpen(true)}
      >
        <i className="fa-solid fa-bag-shopping"></i>
        {cartCount > 0 && <span>{cartCount}</span>}
      </button>

      {isCartOpen && <button className="cart-backdrop" type="button" onClick={() => setIsCartOpen(false)} />}

      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div>
            <p>Your cart</p>
            <strong>{cartCount} items</strong>
          </div>
          <button type="button" onClick={() => setIsCartOpen(false)}>
            Close
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 && (
            <p className="cart-empty-text">Your cart is empty.</p>
          )}

          {cartItems.map((item) => (
            <article className="cart-item" key={item.foodId}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.partnerName}</p>
                <span>Rs. {item.price * item.quantity}</span>
              </div>

              <div className="cart-item-actions">
                <div className="cart-qty">
                  <button type="button" onClick={() => decreaseQuantity(item.foodId)}>-</button>
                  <strong>{item.quantity}</strong>
                  <button type="button" onClick={() => increaseQuantity(item.foodId)}>+</button>
                </div>
                <button
                  className="cart-remove"
                  type="button"
                  onClick={() => removeFromCart(item.foodId)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="cart-footer">
          <div>
            <span>Total</span>
            <strong>Rs. {cartTotal}</strong>
          </div>
          <button type="button">Checkout Soon</button>
        </div>
      </aside>
    </>
  )
}

export default CartDrawer
