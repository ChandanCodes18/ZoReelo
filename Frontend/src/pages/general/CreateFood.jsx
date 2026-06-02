import React, { useState } from 'react'
import axios from 'axios'
import '../../styles/Home.css'

const CreateFood = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    const formData = new FormData()
    const video = e.target.video.files[0]
    const name = e.target.name.value.trim()
    const description = e.target.description.value.trim()
    const price = e.target.price.value

    if (!name || !price || !video) {
      setMessage('Name, price, and video are required.')
      return
    }

    setLoading(true)

    formData.append('Name', name)
    formData.append('Description', description)
    formData.append('Price', price)
    formData.append('Video', video)

    try {
      await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      e.target.reset()
      setMessage('Food item created successfully.')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not create food item.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="create-food-page">
      <section className="create-food-card">
        <p className="store-pill">Partner upload</p>
        <h1>Create food reel</h1>
        <p className="create-food-subtitle">Add the dish details that should appear in the taste feed.</p>

        <form className="create-food-form" onSubmit={handleSubmit}>
          <div className="create-food-group">
            <label htmlFor="name">Food Name</label>
            <input id="name" name="name" type="text" placeholder="Paneer Tikka Roll" required />
          </div>

          <div className="create-food-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows="4" placeholder="Short reel caption for the dish" />
          </div>

          <div className="create-food-group">
            <label htmlFor="price">Price</label>
            <input id="price" name="price" type="number" min="1" placeholder="249" required />
          </div>

          <div className="create-food-group">
            <label htmlFor="video">Video</label>
            <input id="video" name="video" type="file" accept="video/*" required />
          </div>

          {message && <p className="create-food-message">{message}</p>}

          <button className="create-food-submit" type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Create Food Item'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default CreateFood
