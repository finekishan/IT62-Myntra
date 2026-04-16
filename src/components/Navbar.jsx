import React, { useState } from "react";
import { FaRegUser, FaRegHeart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../AppContext";
import logo from "../assets/myntra_logo.webp";
import "./Navbar.css";

const NAV_ITEMS = [
  {
    label: "Men", color: "#ff3f6c",
    dropdown: [
      { heading: "Topwear", links: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Sweatshirts", "Sweaters", "Jackets", "Blazers & Coats", "Suits", "Rain Jackets"] },
      { heading: "Indian & Festive Wear", links: ["Kurtas & Kurta Sets", "Sherwanis", "Nehru Jackets", "Dhotis"] },
      { heading: "Bottomwear", links: ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers"] },
      { heading: "Innerwear & Sleepwear", links: ["Briefs & Trunks", "Boxers", "Vests", "Sleepwear & Loungewear", "Thermals"] },
      { heading: "Footwear", links: ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops", "Socks"] },
      { heading: "Sports & Active Wear", links: ["Sports Shoes", "Active T-Shirts", "Track Pants & Shorts", "Tracksuits", "Jackets & Sweatshirts", "Swimwear"] },
      { heading: "Fashion Accessories", links: ["Wallets", "Belts", "Perfumes & Body Mists", "Caps & Hats", "Bags & Backpacks"] },
      { heading: "Gadgets", links: ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"] },
    ],
  },
  {
    label: "Women", color: "#e91e8c",
    dropdown: [
      { heading: "Indian & Fusion Wear", links: ["Kurtas & Suits", "Kurtis, Tunics & Tops", "Sarees", "Ethnic Wear", "Leggings, Salwars & Churidars", "Skirts & Palazzos", "Lehenga Cholis", "Dupattas & Shawls"] },
      { heading: "Western Wear", links: ["Dresses", "Tops", "T-Shirts", "Jeans", "Trousers & Capris", "Shorts & Skirts", "Co-ords", "Jumpsuits", "Shrugs", "Sweaters & Sweatshirts", "Jackets & Coats", "Blazers"], sectionLink: "/clothing/womens-western-wear" },
      { heading: "Footwear", links: ["Flats", "Casual Shoes", "Heels", "Boots", "Sports Shoes & Floaters"] },
      { heading: "Lingerie & Sleepwear", links: ["Bras", "Briefs", "Shapewear", "Sleepwear & Loungewear", "Swimwear", "Camisoles & Thermals"] },
      { heading: "Beauty & Personal Care", links: ["Makeup", "Skincare", "Premium Beauty", "Lipsticks", "Fragrances"] },
      { heading: "Accessories", links: ["Handbags", "Bags & Clutches", "Jewellery", "Watches & Wearables", "Belts, Scarves & More", "Sunglasses"] },
    ],
  },
  {
    label: "Kids", color: "#ff9f00",
    dropdown: [
      { heading: "Boys Clothing", links: ["T-Shirts", "Shirts", "Shorts", "Jeans", "Trousers", "Clothing Sets", "Ethnic Wear", "Track Pants", "Sweaters & Sweatshirts", "Jackets & Coats"] },
      { heading: "Girls Clothing", links: ["Dresses", "Tops", "Ethnic Wear", "Jeans & Trousers", "Shorts & Skirts", "Clothing Sets", "Sweaters & Sweatshirts", "Jackets & Coats"] },
      { heading: "Footwear", links: ["Casual Shoes", "Flipflops & Sandals", "Sports Shoes", "School Shoes"] },
      { heading: "Toys & Games", links: ["Learning & Development", "Activity Toys", "Soft Toys", "Action Figure / Play Set"] },
      { heading: "Infants", links: ["Bodysuits", "Rompers & Sleepsuits", "Clothing Sets", "Tshirts & Tops", "Dresses", "Bottom Wear", "Winter Wear"] },
    ],
  },
  {
    label: "Home", color: "#26a541",
    dropdown: [
      { heading: "Bed & Bath", links: ["Bed Sheets", "Bedding Sets", "Blankets, Quilts & Dohars", "Pillows & Pillow Covers", "Towels", "Bath Rugs"] },
      { heading: "Furnishing", links: ["Curtains", "Cushions & Cushion Covers", "Carpets", "Wall Decor", "Clocks", "Mirrors", "Lamps & Lighting"] },
      { heading: "Kitchen & Table", links: ["Table Covers & Furnishing", "Serveware", "Cookware", "Storage & Containers", "Bakeware"] },
      { heading: "Flooring", links: ["Floor Runners", "Doormats", "Bath Mats", "Area Rugs"] },
    ],
  },
  {
    label: "Beauty", color: "#7b2ff7",
    dropdown: [
      { heading: "Makeup", links: ["Lipstick", "Lip Gloss", "Foundation", "Concealer", "Compact", "Eye Shadow", "Mascara", "Eyeliner", "Nail Polish", "Makeup Remover"] },
      { heading: "Skincare", links: ["Moisturiser", "Serums", "Face Wash", "Sunscreen", "Toner", "Face Scrub", "Face Mask", "Eye Cream"] },
      { heading: "Haircare", links: ["Shampoo", "Conditioner", "Hair Serum", "Hair Oil", "Hair Colour", "Hair Styling"] },
      { heading: "Fragrances", links: ["Perfumes", "Deodorants", "Body Mists", "Gift Sets"] },
    ],
  },
  {
    label: "GENS", color: "#ff3f6c",
    dropdown: [
      { heading: "Topwear", links: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Sweatshirts", "Sweaters", "Jackets", "Blazers & Coats", "Suits", "Rain Jackets"] },
      { heading: "Bottomwear", links: ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers"] },
      { heading: "Footwear", links: ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops", "Socks"] },
      { heading: "Fashion Accessories", links: ["Wallets", "Belts", "Perfumes & Body Mists", "Caps & Hats", "Bags & Backpacks"] },
    ],
  },
  {
    label: "Studio", color: "#00b5ad", isNew: true,
    dropdown: [
      { heading: "Explore Studio", links: ["New Arrivals", "Trending Now", "Top Picks", "Curated Collections", "Style Guide", "Lookbook"] },
    ],
  },
];

export default function Navbar({ onDropdownChange, onLineChange }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout, wishlist, cart } = useApp();
  const handleMouseEnter = (label, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const item = NAV_ITEMS.find((i) => i.label === label) || { color: "#ff3f6c" };
    setActiveMenu(label);
    onDropdownChange?.(true);
    onLineChange?.({ left: rect.left, width: rect.width, color: item.color });
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    onDropdownChange?.(false);
    onLineChange?.(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/clothing/womens-western-wear?q=${encodeURIComponent(q)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="navbar">

      {/* ── Mobile Top Bar ── */}
      <div className="mobile-topbar">
        <button className="hamburger" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="logo mobile-logo">
          <Link to="/"><img src={logo} alt="Myntra" /></Link>
        </div>
        <div className="mobile-top-icons">
          <FaSearch onClick={() => navigate("/clothing/womens-western-wear")} style={{ cursor: "pointer" }} />
          <Link to="/bag"><MdOutlineShoppingBag /></Link>
        </div>
      </div>

      {/* ── Desktop Left ── */}
      <div className="navbar-left">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Myntra" /></Link>
        </div>
        <nav className="nav-links">
          {NAV_ITEMS.map(({ label, color, isNew, dropdown }) => (
            <div
              key={label}
              className="nav-item"
              onMouseEnter={(e) => handleMouseEnter(label, e)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav-item-link" style={{ "--item-color": color }} onClick={() => { navigate(`/clothing/womens-western-wear?cat=${encodeURIComponent(label)}`); handleMouseLeave(); }}>
                {label}
                {isNew && <sup className="new-badge">New</sup>}
              </span>

              {activeMenu === label && dropdown && (
                <div className="nav-dropdown" style={{ "--item-color": color }}>
                  {dropdown.map(({ heading, links, sectionLink }) => (
                    <div key={heading} className="nav-dropdown-col">
                      <h4 className="nav-dropdown-heading">
                        {sectionLink
                          ? <Link to={sectionLink} style={{ color: "inherit", textDecoration: "none" }} onClick={handleMouseLeave}>{heading}</Link>
                          : heading
                        }
                      </h4>
                      <ul>
                        {links.map((link) => (
                          <li key={link}>
                            <Link to={`/clothing/womens-western-wear?cat=${encodeURIComponent(link)}`} onClick={handleMouseLeave}>{link}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* ── Desktop Center: Search ── */}
      <div className="navbar-center">
        <form className="search-box" onSubmit={handleSearch}>
          <FaSearch className="search-icon" style={{ cursor: "pointer" }} onClick={handleSearch} />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* ── Desktop Right: Icons ── */}
      <div className="navbar-right">

        {/* Profile with hover dropdown */}
        <div
          className="nav-icon"
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setActiveMenu("profile");
            onDropdownChange?.(true);
            onLineChange?.({ left: rect.left, width: rect.width, color: "#ff3f6c" });
          }}
          onMouseLeave={handleMouseLeave}
        >
          <span className="nav-icon-link" style={{ cursor: 'pointer' }} onClick={() => user && navigate('/profile')}>
            <FaRegUser />
            <span>Profile</span>
          </span>

          {activeMenu === "profile" && (
            <div className="icon-dropdown profile-dropdown">
              {user ? (
                <>
                  <div className="icon-dropdown-header">
                    <p className="profile-welcome">{user.name || user.email.split('@')[0]}</p>
                    <p className="profile-sub">{user.email}</p>
                  </div>
                  <ul className="icon-dropdown-menu">
                    <li><Link to="/profile" onClick={handleMouseLeave}>Orders</Link></li>
                    <li><Link to="/wishlist" onClick={handleMouseLeave}>Wishlist</Link></li>
                    <li><Link to="/bag" onClick={handleMouseLeave}>Bag</Link></li>
                    <li className="divider" />
                    <li><span className="logout-link" onClick={() => { logout(); handleMouseLeave(); }}>Logout</span></li>
                  </ul>
                </>
              ) : (
                <>
                  <div className="icon-dropdown-header">
                    <p className="profile-welcome">Welcome</p>
                    <p className="profile-sub">To access account and manage orders</p>
                    <button className="icon-dropdown-login" onClick={() => { navigate("/profile"); handleMouseLeave(); }}>LOGIN / SIGNUP</button>
                  </div>
                  <ul className="icon-dropdown-menu">
                    <li><Link to="/profile" onClick={handleMouseLeave}>Orders</Link></li>
                    <li><Link to="/wishlist" onClick={handleMouseLeave}>Wishlist</Link></li>
                    <li><Link to="/profile" onClick={handleMouseLeave}>Gift Cards</Link></li>
                    <li><Link to="/profile" onClick={handleMouseLeave}>Contact Us</Link></li>
                    <li className="divider" />
                    <li><Link to="/profile" onClick={handleMouseLeave}>Saved Cards</Link></li>
                    <li><Link to="/profile" onClick={handleMouseLeave}>Saved Addresses</Link></li>
                  </ul>
                </>
              )}
            </div>
          )}
        </div>

        {/* Wishlist */}
        <div className="nav-icon">
          <Link to="/wishlist" className="nav-icon-link">
            <span className="icon-wrap">
              <FaRegHeart />
              {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
            </span>
            <span>Wishlist</span>
          </Link>
        </div>

        {/* Bag */}
        <div className="nav-icon">
          <Link to="/bag" className="nav-icon-link">
            <span className="icon-wrap">
              <MdOutlineShoppingBag />
              {cart.length > 0 && <span className="nav-badge">{cart.length}</span>}
            </span>
            <span>Bag</span>
          </Link>
        </div>

      </div>

      {/* ── Mobile Slide Menu ── */}
      {mobileOpen && (
        <div className="mobile-menu">
          <form className="mobile-search" onSubmit={handleSearch}>
            <FaSearch style={{ cursor: "pointer" }} onClick={handleSearch} />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </form>
          {NAV_ITEMS.map(({ label, color, dropdown }) => (
            <div key={label} className="mobile-nav-item">
              <div
                className="mobile-nav-label"
                onClick={() => setMobileExpanded(mobileExpanded === label ? null : label)}
              >
                {label}
                <span>{mobileExpanded === label ? "−" : "+"}</span>
              </div>
              {mobileExpanded === label && dropdown && (
                <div className="mobile-dropdown">
                  {dropdown.map(({ heading, links, sectionLink }) => (
                    <div key={heading}>
                      <p className="mobile-dropdown-heading" style={{ color }}>
                        {sectionLink
                          ? <Link to={sectionLink} style={{ color }} onClick={() => setMobileOpen(false)}>{heading}</Link>
                          : heading
                        }
                      </p>
                      {links.map(link => (
                        <Link
                          key={link}
                          to={`/clothing/womens-western-wear?cat=${encodeURIComponent(link)}`}
                          className="mobile-dropdown-link"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mobile-menu-icons">
            <Link to="/profile" className="mobile-menu-icon-link" onClick={() => setMobileOpen(false)}><FaRegUser /> Profile</Link>
            <Link to="/wishlist" className="mobile-menu-icon-link" onClick={() => setMobileOpen(false)}><FaRegHeart /> Wishlist</Link>
            <Link to="/bag" className="mobile-menu-icon-link" onClick={() => setMobileOpen(false)}><MdOutlineShoppingBag /> Bag</Link>
          </div>
        </div>
      )}

      {/* ── Mobile Bottom Nav ── */}
      <div className="mobile-bottom-nav">
        <Link to="/" className="mobile-bottom-item">
          <img src={logo} alt="Home" className="bottom-nav-logo" />
          <span>Home</span>
        </Link>
        <Link to="/wishlist" className="mobile-bottom-item">
          <FaRegHeart />
          <span>Wishlist</span>
        </Link>
        <Link to="/bag" className="mobile-bottom-item">
          <MdOutlineShoppingBag />
          <span>Bag</span>
        </Link>
        <Link to="/profile" className="mobile-bottom-item">
          <FaRegUser />
          <span>Profile</span>
        </Link>
      </div>

    </header>
  );
}
