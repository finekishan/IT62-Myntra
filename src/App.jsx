import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import PromoStrip from './components/PromoStrip'
import BankOffers from './components/BankOffers'
import ProductGrid from './components/ProductGrid'
import BrandGrid from './components/BrandGrid'
import Footer from './components/Footer'
import SearchPage from './components/SearchPage'
import ProfilePage from './components/ProfilePage'
import WishlistPage from './components/WishlistPage'
import BagPage from './components/BagPage'
import './App.css'

const risingStars = [
  { image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=540&h=720&fit=crop', discount: '50% OFF', description: 'Men Slim Fit Casual Shirt', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Adidas' },
  { image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=540&h=720&fit=crop', discount: '30% OFF', description: 'Women Floral Printed Dress', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'Zara' },
  { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=540&h=720&fit=crop', discount: '40% OFF', description: 'Men Running Sports Shoes', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'Nike' },
  { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=540&h=720&fit=crop', discount: '60% OFF', description: 'Premium Analog Watch', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Fossil' },
  { image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=540&h=720&fit=crop', discount: '45% OFF', description: 'Men Leather Bag', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'Puma' },
  { image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4e5b?w=540&h=720&fit=crop', discount: '35% OFF', description: 'Women Ethnic Kurta', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Libas' },
  { image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=540&h=720&fit=crop', discount: '55% OFF', description: 'Men Perfume Collection', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'Dior' },
  { image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=540&h=720&fit=crop', discount: '25% OFF', description: 'Casual Sneakers', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Adidas' },
  { image: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=540&h=720&fit=crop', discount: '70% OFF', description: 'Women Party Wear', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'H&M' },
  { image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=540&h=720&fit=crop', discount: '20% OFF', description: 'Men Backpack', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Wildcraft' },
]

const medalBrands = [
  { image: 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=540&h=720&fit=crop', discount: '60% OFF', description: 'Nike Air Max Shoes', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'Nike' },
  { image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=540&h=720&fit=crop', discount: '45% OFF', description: 'Men Formal Trousers', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Arrow' },
  { image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=540&h=720&fit=crop', discount: '50% OFF', description: 'Men Graphic T-Shirt', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'Puma' },
  { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=540&h=720&fit=crop', discount: '40% OFF', description: 'Women Party Dress', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Mango' },
  { image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=540&h=720&fit=crop', discount: '55% OFF', description: 'Women Straight Jeans', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: "Levi's" },
  { image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=540&h=720&fit=crop', discount: '35% OFF', description: 'Men Casual Shirt', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Adidas' },
]

const globalBrands = [
  { image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=540&h=720&fit=crop', discount: '30% OFF', description: 'Women Ethnic Wear', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Biba' },
  { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=540&h=720&fit=crop', discount: '65% OFF', description: 'Women Summer Dress', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'Zara' },
  { image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=540&h=720&fit=crop', discount: '40% OFF', description: 'Men Hoodie Sweatshirt', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'H&M' },
  { image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=540&h=720&fit=crop', discount: '25% OFF', description: 'Luxury Perfume', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', brandName: 'Dior' },
  { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=540&h=720&fit=crop', discount: '50% OFF', description: 'Classic Wrist Watch', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Fossil' },
  { image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=540&h=720&fit=crop', discount: '45% OFF', description: 'Premium Handbag', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', brandName: 'Coach' },
]

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [lineInfo, setLineInfo] = useState(null)

  return (
    <>
      <Navbar
        onDropdownChange={setDropdownOpen}
        onLineChange={setLineInfo}
      />

      {lineInfo && (
        <div
          className="nav-color-line"
          style={{
            left: lineInfo.left,
            width: lineInfo.width,
            backgroundColor: lineInfo.color,
          }}
        />
      )}

      <Routes>
        <Route path="/" element={
          <>
            <PromoStrip />
            <HeroBanner />
            <BankOffers />
            <ProductGrid title="R I S I N G  S T A R S" products={risingStars} />
            <BrandGrid title="M E D A L  W O R T H Y  B R A N D S  T O  B A G" products={medalBrands} />
            <BrandGrid title="G R A N D  G L O B A L  B R A N D S" products={globalBrands} />
            <Footer />
          </>
        } />
        <Route path="/clothing/womens-western-wear" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/bag" element={<BagPage />} />
      </Routes>

      {/* Fixed Bell button */}
      <button className="fixed-twitter-btn" title="Notifications">
        <FaBell style={{ color: 'transparent', fontSize: '20px', stroke: '#fff', strokeWidth: '30' }} />
      </button>

      {dropdownOpen && <div className="bg-overlay" />}
    </>
  )
}

export default App
