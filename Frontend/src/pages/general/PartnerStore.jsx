import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import api from '../../api'
import { useCart } from '../../context/CartContext'
import '../../styles/Home.css'

const PartnerStore = () => {
  const { partnerId } = useParams()
  const { state } = useLocation()
  const { addToCart, cartItems } = useCart()
  const [foodItems, setFoodItems] = useState([])

  useEffect(() => {
    api.get('/api/food')
      .then((response) => {
        setFoodItems(response.data.foodItems || [])
      })
      .catch(() => {
        setFoodItems([])
      })
  }, [])

  const storeFoods = useMemo(() => {
    return foodItems.filter((item) => {
      const itemPartnerId = item.foodPartner?._id || item.foodPartner
      return itemPartnerId === partnerId
    })
  }, [foodItems, partnerId])

  const partner = storeFoods[0]?.foodPartner || state?.partner || {
    restaurantName: 'Restaurant Name',
    Address: 'Address',
  }

  const getCartQuantity = (foodId) => {
    return cartItems.find((item) => item.foodId === foodId)?.quantity || 0
  }

  const handleAddToCart = (food) => {
    addToCart({
      foodId: food._id,
      name: food.Name,
      price: food.price,
      video: food.Video,
      partnerId: food.foodPartner?._id || partnerId,
      partnerName: food.foodPartner?.restaurantName || partner.restaurantName,
    })
  }

  return (
    <main className="food-store-page">
      <Link className="store-back-link" to="/">Back</Link>

      <section className="food-store-card">
        <div className="food-store-header">
          <div className="store-logo">
            <i className="fa-solid fa-utensils"></i>
          </div>

          <div className="store-info">
            <div className="store-name-box">{partner.restaurantName}</div>
            <div className="store-address-box">{partner.Address}</div>
          </div>
        </div>

        <div className="store-stats">
          <div>
            <span>Total Food Items</span>
            <strong>{storeFoods.length}</strong>
          </div>
          <div>
            <span>Customers Served</span>
            <strong>20K</strong>
          </div>
        </div>

        <div className="store-section-title">
          <h2>Taste Feed</h2>
          <p>All dishes uploaded by this food partner.</p>
        </div>

        <section className="store-video-grid" aria-label="Uploaded videos">
          {storeFoods.length === 0 && (
            <p className="store-empty-text">No videos uploaded yet.</p>
          )}

          {storeFoods.map((food) => {
            const quantity = getCartQuantity(food._id)

            return (
              <article className="store-feed-card" key={food._id}>
                <Link
                  className="store-video-card"
                  to="/"
                  state={{ selectedFoodId: food._id }}
                >
                  <video src={`${food.Video}#t=0.1`} muted playsInline preload="metadata" />
                  <span className="store-price-tag">Rs. {food.price}</span>
                  <p>{food.Name}</p>
                </Link>

                <button
                  className="store-add-button"
                  type="button"
                  onClick={() => handleAddToCart(food)}
                >
                  {quantity > 0 ? `Added ${quantity}` : 'Add to Cart'}
                </button>
              </article>
            )
          })}
        </section>
      </section>
    </main>
  )
}

export default PartnerStore
