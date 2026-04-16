import { FaHeart, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import Footer from './Footer'
import './WishlistPage.css'

export default function WishlistPage() {
  const navigate = useNavigate()
  const { wishlist, toggleWishlist, moveToCart } = useApp()

  return (
    <>
      <div className="wishlist-page">
        <div className="wishlist-header">
          <FaHeart className="wishlist-icon" />
          <h1>My Wishlist <span>({wishlist.length} items)</span></h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <FaHeart />
            <p>Your wishlist is empty</p>
            <button onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(item => (
              <div key={item.id} className="wishlist-card">
                <div className="wishlist-img-wrap">
                  <img src={item.img} alt={item.product} />
                  <button className="wishlist-remove" onClick={() => toggleWishlist(item)}>
                    <FaTrash />
                  </button>
                </div>
                <div className="wishlist-info">
                  <p className="wishlist-brand">{item.brand}</p>
                  <p className="wishlist-product">{item.product}</p>
                  <div className="wishlist-price">
                    <span className="w-discounted">Rs. {item.discounted}</span>
                    <span className="w-strike">Rs. {item.strike}</span>
                    <span className="w-off">({item.off}% OFF)</span>
                  </div>
                  <button className="wishlist-add-bag" onClick={() => {
                    const ok = moveToCart(item)
                    if (!ok) navigate('/profile')
                  }}>
                    MOVE TO BAG
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
