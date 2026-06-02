import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../styles/Home.css'
import axios from 'axios'
import { useCart } from '../../context/CartContext'

function normalizePartner(partner) {
  if (!partner) {
    return {
      _id: 'unknown',
      restaurantName: 'Zoreelo Partner',
      CuisineType: 'Fresh food',
      Address: 'Near you',
    }
  }

  if (typeof partner === 'string') {
    return {
      _id: partner,
      restaurantName: 'Zoreelo Partner',
      CuisineType: 'Fresh food',
      Address: 'Near you',
    }
  }

  return {
    _id: partner._id || partner.id || 'unknown',
    restaurantName: partner.restaurantName || partner.RestaurantName || 'Zoreelo Partner',
    CuisineType: partner.CuisineType || partner.cuisineType || 'Fresh food',
    Address: partner.Address || partner.address || 'Near you',
  }
}

const Home = () => {
  const location = useLocation()
  const { addToCart, cartItems } = useCart()
  const [foodItems, setFoodItems] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const reelRefs = useRef([])

  useEffect(() => {
    let ignore = false

    async function loadFoodItems() {
      try {
        const response = await axios.get('http://localhost:3000/api/food', {
          withCredentials: true,
        })

        if (!ignore) {
          setFoodItems(response.data.foodItems || [])
        }
      } catch (error) {
        if (!ignore) {
          setFoodItems([])
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadFoodItems()

    return () => {
      ignore = true
    }
  }, [])

  const reels = useMemo(() => {
    return foodItems.map((item) => ({
      ...item,
      foodPartner: normalizePartner(item.foodPartner),
    }))
  }, [foodItems])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index)

          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            setActiveIndex(index)
          }
        })
      },
      {
        threshold: [0.75],
      },
    )

    reelRefs.current.forEach((reel) => {
      if (reel) observer.observe(reel)
    })

    return () => observer.disconnect()
  }, [reels.length])

  useEffect(() => {
    reelRefs.current.forEach((reel, index) => {
      const video = reel?.querySelector('video')

      if (!video) return

      if (index === activeIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeIndex])

  useEffect(() => {
    if (!location.state?.selectedFoodId || reels.length === 0) return

    const selectedIndex = reels.findIndex((reel) => reel._id === location.state.selectedFoodId)
    const selectedReel = reelRefs.current[selectedIndex]

    if (selectedReel) {
      selectedReel.scrollIntoView({ behavior: 'smooth' })
      setActiveIndex(selectedIndex)
    }
  }, [location.state, reels])

  const getCartQuantity = (foodId) => {
    return cartItems.find((item) => item.foodId === foodId)?.quantity || 0
  }

  const handleAddToCart = (reel) => {
    addToCart({
      foodId: reel._id,
      name: reel.Name,
      price: reel.price,
      video: reel.Video,
      partnerId: reel.foodPartner._id,
      partnerName: reel.foodPartner.restaurantName,
    })
  }

  return (
    <main className="reels-page">
      <div className="reels-topbar">
        <Link to="/" className="brand-mark">Zoreelo</Link>
        <div className="feed-status">
          {isLoading ? 'Finding fresh plates' : 'Taste feed'}
        </div>
      </div>

      <section className="reels-feed" aria-label="Food reels feed">
        {!isLoading && reels.length === 0 && (
          <div className="empty-feed">
            <h1>No food reels yet</h1>
            <p>Videos uploaded by food partners will appear here.</p>
          </div>
        )}

        {reels.map((reel, index) => {
          const quantity = getCartQuantity(reel._id)

          return (
            <article
              className="reel"
              key={reel._id || `${reel.Name}-${index}`}
              data-index={index}
              ref={(element) => {
                reelRefs.current[index] = element
              }}
            >
              <video
                className="reel-video"
                src={reel.Video}
                muted
                loop
                playsInline
                autoPlay={index === activeIndex}
                preload={index === activeIndex ? 'auto' : 'metadata'}
              />

              <div className="reel-shade" />

              <div className="reel-copy">
                <p className="store-pill">{reel.foodPartner.CuisineType}</p>
                <div className="reel-meta-row">
                  <span className="reel-price-chip">Rs. {reel.price}</span>
                  <button
                    className="reel-cart-button"
                    type="button"
                    onClick={() => handleAddToCart(reel)}
                  >
                    {quantity > 0 ? `Added ${quantity}` : 'Add to Cart'}
                  </button>
                </div>
                <h1>{reel.Name}</h1>
                <p className="reel-description">{reel.description || 'Fresh from the kitchen and ready when you are.'}</p>

                <div className="partner-row">
                  <div>
                    <strong>{reel.foodPartner.restaurantName}</strong>
                    <span>{reel.foodPartner.Address}</span>
                  </div>
                  <Link
                    className="visit-store-button"
                    to={`/store/${reel.foodPartner._id}`}
                    state={{
                      partner: reel.foodPartner,
                      featuredItem: {
                        name: reel.Name,
                        description: reel.description,
                        video: reel.Video,
                      },
                    }}
                  >
                    Visit Store
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default Home
