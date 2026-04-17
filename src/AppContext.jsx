import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}

export function AppProvider({ children }) {
  const [user,     setUser]     = useState(() => load('mn_user', null))
  const [wishlist, setWishlist] = useState(() => load('mn_wishlist', []))
  const [cart,     setCart]     = useState(() => load('mn_cart', []))
  const [orders,   setOrders]   = useState(() => load('mn_orders', []))

  useEffect(() => { localStorage.setItem('mn_user',     JSON.stringify(user))     }, [user])
  useEffect(() => { localStorage.setItem('mn_wishlist', JSON.stringify(wishlist)) }, [wishlist])
  useEffect(() => { localStorage.setItem('mn_cart',     JSON.stringify(cart))     }, [cart])
  useEffect(() => { localStorage.setItem('mn_orders',   JSON.stringify(orders))   }, [orders])

  const login  = (name, email) => setUser({ name, email })
  const logout = () => { setUser(null); setWishlist([]); setCart([]) }

  const toggleWishlist = (product) => {
    if (!user) return false
    setWishlist(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    )
    return true
  }

  const isWishlisted = (id) => wishlist.some(p => p.id === id)

  const addToCart = (product) => {
    if (!user) return false
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1, size: product.sizes || 'M' }]
    })
    return true
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const changeQty = (id, delta) => setCart(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  )

  const moveToCart = (product) => {
    if (!user) return false
    addToCart(product)
    setWishlist(prev => prev.filter(p => p.id !== product.id))
    return true
  }

  const placeOrder = () => {
    if (!cart.length) return null
    const order = {
      id: `MYN${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN'),
      items: [...cart],
      total: cart.reduce((s, i) => s + i.discounted * i.qty, 0),
      status: 'Confirmed'
    }
    setOrders(prev => [order, ...prev])
    setCart([])
    return order.id
  }

  return (
    <AppContext.Provider value={{
      user, login, logout,
      wishlist, toggleWishlist, isWishlisted,
      cart, addToCart, removeFromCart, changeQty, moveToCart,
      orders, placeOrder
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
