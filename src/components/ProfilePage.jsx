import { useState } from 'react'
import { FaRegUser, FaBox, FaHeart, FaGift, FaPhone, FaStar, FaCreditCard, FaTag, FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import Footer from './Footer'
import './ProfilePage.css'

const BANNER = 'https://assets.myntassets.com/assets/images/2026/FEBRUARY/26/7sTTESIn_3069d7c58f724227946ec2772955333d.png'

export default function ProfilePage() {
  const { user, login, logout, wishlist, cart } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState('mobile')   // 'mobile' | 'otp'
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [sentOtp] = useState('1234')           // mock OTP

  const handleMobileSubmit = (e) => {
    e.preventDefault()
    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }
    if (!consent) {
      setError('Please accept the Terms of Use & Privacy Policy')
      return
    }
    setError('')
    setStep('otp')
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault()
    if (otp.length !== 4) { setError('Please enter the 4-digit OTP'); return }
    if (otp !== sentOtp) { setError('Incorrect OTP. Try 1234'); return }
    login(`User${mobile.slice(-4)}`, mobile)
    setError('')
    navigate('/')
  }

  const handleLogout = () => {
    logout()
    setMobile(''); setOtp(''); setConsent(false); setStep('mobile')
  }

  const menuItems = [
    { icon: <FaBox />,          label: 'Orders',                        to: '/profile' },
    { icon: <FaHeart />,        label: `Wishlist (${wishlist.length})`, to: '/wishlist' },
    { icon: <FaShoppingBag />,  label: `Bag (${cart.length})`,          to: '/bag' },
    { icon: <FaGift />,         label: 'Gift Cards',                    to: '/profile' },
    { icon: <FaPhone />,        label: 'Contact Us',                    to: '/profile' },
    { icon: <FaStar />,         label: 'Myntra Insider',                to: '/profile' },
    { icon: <FaCreditCard />,   label: 'Myntra Credit',                 to: '/profile' },
    { icon: <FaTag />,          label: 'Coupons',                       to: '/profile' },
    { icon: <FaCreditCard />,   label: 'Saved Cards',                   to: '/profile' },
    { icon: <FaMapMarkerAlt />, label: 'Saved Addresses',               to: '/profile' },
  ]

  return (
    <>
      <div className="profile-page">
        {!user ? (
          <div className="auth-container">
            <div className="auth-banner">
              <img src={BANNER} alt="Myntra" />
            </div>

            <div className="auth-box">
              <h1 className="auth-heading">
                Login <span className="auth-heading-or">or</span> Signup
              </h1>

              {step === 'mobile' ? (
                <form className="auth-form" onSubmit={handleMobileSubmit}>
                  <div className="auth-field mobile-field">
                    <span className="mobile-prefix">+91</span>
                    <span className="mobile-divider">|</span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setError('') }}
                      autoFocus
                    />
                    <span className="mobile-req">*</span>
                  </div>

                  <label className="auth-consent">
                    <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
                    <span>
                      By continuing, I agree to the <a href="/">Terms of Use</a> &amp; <a href="/">Privacy Policy</a> and I am above 18 years old.
                    </span>
                  </label>

                  {error && <p className="auth-error">{error}</p>}

                  <button type="submit" className={`auth-btn${mobile.length !== 10 ? ' auth-btn-disabled' : ''}`}>
                    CONTINUE
                  </button>
                </form>
              ) : (
                <form className="auth-form" onSubmit={handleOtpSubmit}>
                  <p className="otp-sent-msg">
                    OTP sent to <strong>+91 {mobile}</strong>
                    <button type="button" className="otp-change" onClick={() => { setStep('mobile'); setOtp(''); setError('') }}>
                      Change
                    </button>
                  </p>

                  <div className="auth-field">
                    <input
                      type="tel"
                      maxLength={4}
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setError('') }}
                      autoFocus
                    />
                    <p className="otp-hint">Use OTP: <strong>1234</strong></p>
                  </div>

                  {error && <p className="auth-error">{error}</p>}

                  <button type="submit" className={`auth-btn${otp.length !== 4 ? ' auth-btn-disabled' : ''}`}>
                    VERIFY OTP
                  </button>

                  <p className="auth-resend">
                    Didn't receive OTP? <button type="button" onClick={() => setError('')}>Resend OTP</button>
                  </p>
                </form>
              )}

              <p className="auth-help">Have trouble logging in? <span>Get help</span></p>
            </div>
          </div>
        ) : (
          <div className="profile-container">
            <aside className="profile-sidebar">
              <div className="profile-avatar">
                <FaRegUser />
                <div>
                  <p className="profile-name">{user.name}</p>
                  <p className="profile-email">+91 {user.email}</p>
                </div>
              </div>
              <ul className="profile-menu">
                {menuItems.map(item => (
                  <li key={item.label}>
                    <Link to={item.to}>{item.icon} {item.label}</Link>
                  </li>
                ))}
                <li className="logout" onClick={handleLogout}>Logout</li>
              </ul>
            </aside>

            <div className="profile-content">
              <h2>My Orders</h2>
              <div className="empty-state">
                <FaBox />
                <p>No orders yet</p>
                <Link to="/">Start Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
