import { FaTrash, FaShoppingBag } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import Footer from './Footer'
import './BagPage.css'

export default function BagPage() {
  const navigate = useNavigate()
  const { cart, removeFromCart, changeQty } = useApp()

  const subtotal = cart.reduce((s, i) => s + i.discounted * i.qty, 0)
  const discount = cart.reduce((s, i) => s + (i.strike - i.discounted) * i.qty, 0)
  const delivery = subtotal > 999 ? 0 : 49
  const total    = subtotal + delivery

  return (
    <>
      <div className="bag-page">
        <h1 className="bag-title">My Bag <span>({cart.length} items)</span></h1>

        {cart.length === 0 ? (
          <div className="bag-empty">
            <FaShoppingBag />
            <p>Your bag is empty</p>
            <button onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        ) : (
          <div className="bag-layout">
            <div className="bag-items">
              {cart.map(item => (
                <div key={item.id} className="bag-card">
                  <img src={item.img} alt={item.product} className="bag-img" />
                  <div className="bag-info">
                    <p className="bag-brand">{item.brand}</p>
                    <p className="bag-product">{item.product}</p>
                    <p className="bag-meta">Size: <strong>{item.size}</strong></p>
                    <div className="bag-qty">
                      <button onClick={() => changeQty(item.id, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => changeQty(item.id, +1)}>+</button>
                    </div>
                    <div className="bag-price-row">
                      <span className="bag-discounted">Rs. {item.discounted * item.qty}</span>
                      <span className="bag-strike">Rs. {item.strike * item.qty}</span>
                      <span className="bag-off">({item.off}% OFF)</span>
                    </div>
                  </div>
                  <button className="bag-remove" onClick={() => removeFromCart(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="bag-summary">
              <h3>PRICE DETAILS</h3>
              <div className="summary-row"><span>Price ({cart.length} items)</span><span>Rs. {subtotal + discount}</span></div>
              <div className="summary-row green"><span>Discount</span><span>− Rs. {discount}</span></div>
              <div className="summary-row">
                <span>Delivery Charges</span>
                <span className={delivery === 0 ? 'green' : ''}>{delivery === 0 ? 'FREE' : `Rs. ${delivery}`}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total"><span>Total Amount</span><span>Rs. {total}</span></div>
              <div className="summary-divider" />
              <p className="summary-saving">You will save Rs. {discount} on this order</p>
              <button className="place-order-btn">PLACE ORDER</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
