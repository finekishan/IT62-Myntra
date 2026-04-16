import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useApp } from '../AppContext';
import Footer from './Footer';
import './SearchPage.css';

const ALL_PRODUCTS = [
  { id: 20717712, brand: 'SASSAFRAS', category: 'Trousers', product: 'Women High-Rise Trousers', sizes: '34', discounted: 713, strike: 1699, off: 58, color: 'Black', rating: 4.2, ratingCount: '17.9k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/20717712/2023/1/17/28c7a830-4f47-40f6-bbb4-46bc62ddd90c1673947837762-SASSAFRAS-Women-Black-High-Rise-Bootcut-Trousers-25616739478-1.jpg' },
  { id: 12222102, brand: 'SASSAFRAS', category: 'Trousers', product: 'Women Regular Wide Track Pants', sizes: 'XS', discounted: 749, strike: 1499, off: 50, color: 'Black', rating: 4.4, ratingCount: '69.8k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/12222102/2023/4/11/b32844b9-cc78-4217-bdfa-253598acac701681204750883-SASSAFRAS-Women-Black-Regular-Fit-Solid-Wide-Leg-Track-Pants-11.jpg' },
  { id: 30824755, brand: 'Tokyo Talkies', category: 'Tshirts', product: 'Women Graphic Printed T-shirt', sizes: 'S', discounted: 134, strike: 899, off: 85, color: 'Green', rating: 3.6, ratingCount: '189', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/30824755/2025/2/18/2c5a49d8-0528-45c5-8398-d78930dee7141739885098544-Tokyo-Talkies-Women-Graphic-Printed-Round-Neck-T-shirt-11739-1.jpg', isAd: true },
  { id: 31304172, brand: 'SASSAFRAS', category: 'Trousers', product: 'Women Regular Fit Track Pants', sizes: 'M', discounted: 671, strike: 1599, off: 58, color: 'Green', rating: 4.4, ratingCount: '69.7k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2024/OCTOBER/15/Pxup61ee_0e15d5f75c2243d4bbb04bb82f30ed5b.jpg' },
  { id: 28495290, brand: 'SASSAFRAS', category: 'Trousers', product: 'Women Cotton Track Pants', sizes: 'XS', discounted: 764, strike: 1699, off: 55, color: 'Black', rating: 4.4, ratingCount: '3.3k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/28495290/2024/3/23/5e2ea59f-3abe-42fc-94ce-5b3aa008552b1711199034861TrackPants1.jpg' },
  { id: 30760964, brand: 'Tokyo Talkies', category: 'Dresses', product: 'Empire Midi Dress', sizes: 'XS', discounted: 383, strike: 3199, off: 88, color: 'Blue', rating: 4.1, ratingCount: '2.3k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/30760964/2024/9/12/806272b1-8fb9-4b5f-a9d0-6cbdb190c2861726128991229-Tokyo-Talkies-Empire-Midi-Dress-6911726128990942-1.jpg', isAd: true },
  { id: 31304177, brand: 'SASSAFRAS', category: 'Trousers', product: 'Women Mid-Rise Track Pants', sizes: 'XS', discounted: 671, strike: 1599, off: 58, color: 'Blue', rating: 4.4, ratingCount: '69.7k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2024/OCTOBER/14/TWbqSbQK_fe444410b9d541608fa533eae2db62b3.jpg' },
  { id: 19780122, brand: 'SASSAFRAS', category: 'Trousers', product: 'Women Track Pants', sizes: 'L', discounted: 773, strike: 1799, off: 57, color: 'Pink', rating: 4.4, ratingCount: '4.2k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/19780122/2022/9/16/c32a4834-7cce-4ed7-bb5d-0549ae4ef5b01663318751242-SASSAFRAS-Women-Track-Pants-6011663318750539-1.jpg' },
  { id: 33783522, brand: 'Tokyo Talkies', category: 'Dresses', product: 'Women Fit & Flare Dress', sizes: 'S', discounted: 254, strike: 2549, off: 90, color: 'Pink', rating: 3.9, ratingCount: '451', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/APRIL/26/rAzXxw7U_74520b43bd7f41e49672a988d6ffaea6.jpg', isAd: true },
  { id: 10856322, brand: 'SASSAFRAS', category: 'Tops', product: 'Longline Open Front Shrug', sizes: 'M', discounted: 799, strike: 1999, off: 60, color: 'Black', rating: 4.4, ratingCount: '22.1k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/10856322/2022/4/20/f8cf76a6-24a0-495f-b4a4-d86964e0528a1650446665934SASSAFRASWomenBlackRibbedLonglineOpenFrontShrug1.jpg' },
  { id: 29233396, brand: 'SASSAFRAS', category: 'Dresses', product: 'Fit & Flare Midi Dress', sizes: 'XL', discounted: 1319, strike: 2999, off: 56, color: 'Pink', rating: 4.2, ratingCount: '549', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/29233396/2024/4/29/766f43ba-6fe8-43a3-aef5-85b71b2e49461714359776870SASSAFRASA-LineMidiDress1.jpg', urgency: 'Only Few Left!' },
  { id: 22930418, brand: 'Tokyo Talkies', category: 'Dresses', product: 'Striped Fit & Flare Midi Dress', sizes: 'S', discounted: 695, strike: 2399, off: 71, color: 'Navy Blue', rating: 4.4, ratingCount: '1k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/22930418/2023/4/28/a10c4e5c-6bb3-479a-8927-3373a9b47b311682656226166TokyoTalkiesNavyBluePrintMaxiDress1.jpg', isAd: true },
  { id: 24958612, brand: 'SASSAFRAS', category: 'Trousers', product: 'Women Bootcut Trousers', sizes: '28', discounted: 809, strike: 1799, off: 55, color: 'White', rating: 4.5, ratingCount: '7.1k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/24958612/2023/11/21/956b983f-c752-4438-8136-9820ab71dbc31700560003364-SASSAFRAS-Women-Slim-Fit-Bootcut-Trousers-7961700560003023-1.jpg' },
  { id: 25952710, brand: 'SASSAFRAS', category: 'Tops', product: 'Side Slit A-Line Midi Skirt', sizes: '26', discounted: 945, strike: 2199, off: 57, color: 'Blue', rating: 4.4, ratingCount: '3.4k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/25952710/2024/5/8/f736c7d3-e3e7-4861-a5ab-816ea340791a1715160466806-SASSAFRAS-Blue-Side-Slit-A-Line-Midi-Skirt-2301715160466457-1.jpg' },
  { id: 30761128, brand: 'Tokyo Talkies', category: 'Dresses', product: 'Floral Print A-Line Maxi Dress', sizes: 'S', discounted: 281, strike: 2349, off: 88, color: 'Pink', rating: 4.1, ratingCount: '455', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/30761128/2024/9/12/ab1ebf5b-0453-4f37-b853-d84d5c370c111726134426826-Tokyo-Talkies-Floral-Printed-A-Line-Maxi-Dress-2241726134426-1.jpg', isAd: true },
  { id: 33383656, brand: 'Tokyo Talkies', category: 'Jeans', product: 'Women Flared High Rise Jeans', sizes: '30', discounted: 461, strike: 2099, off: 78, color: 'Blue', rating: 4.4, ratingCount: '453', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/MARCH/28/DXVXHNmT_a9f1b5b7aa94474a80848fd4a02f7e0f.jpg' },
  { id: 10856140, brand: 'SASSAFRAS', category: 'Tops', product: 'Longline Open Front Shrug Burgundy', sizes: 'XL', discounted: 799, strike: 1999, off: 60, color: 'Purple', rating: 4.4, ratingCount: '22.1k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/10856140/2019/11/2/3e0ca55d-916b-489a-a2af-f03a6f4426ef1572679900333-SASSAFRAS-Women-Shrug-9191572679899399-1.jpg' },
  { id: 27505068, brand: 'Tokyo Talkies', category: 'Dresses', product: 'Embroidered Sheath Dress', sizes: 'XS', discounted: 594, strike: 2049, off: 71, color: 'White', rating: 4.1, ratingCount: '373', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/27505068/2024/2/12/9452ec3d-b045-47ca-9b12-2e3d76a83c311707709467981TokyoTalkiesSheathDress1.jpg', isAd: true },
  { id: 15508746, brand: 'SASSAFRAS', category: 'Tops', product: 'Solid Boiler Jumpsuit', sizes: 'XL', discounted: 965, strike: 2299, off: 58, color: 'Blue', rating: 4.3, ratingCount: '4.4k', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/15508746/2021/10/8/76d93c26-46fa-4946-826c-8957e2ff173c1633676949601-SASSAFRAS-Women-Jumpsuit-9261633676949313-1.jpg' },
  { id: 26547924, brand: 'Tokyo Talkies', category: 'Tops', product: 'Women Mid Rise Cotton Shorts', sizes: '28', discounted: 527, strike: 1599, off: 67, color: 'Black', rating: 4.3, ratingCount: '939', img: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/26547924/2023/12/20/aaeaacbf-f8a7-4ddd-b407-67ef488e7dd71703057455234TokyoTalkiesWomenBlackShorts1.jpg' },
];

const CATEGORIES = ['Dresses', 'Tops', 'Trousers', 'Jeans', 'Sweatshirts', 'Sweaters', 'Tshirts', 'Shirts'];
const BRANDS = ['SASSAFRAS', 'Tokyo Talkies', 'StyleCast', 'LULU & SKY', 'BAESD', 'Trendyol', 'Roadster', 'DressBerry'];
const COLORS = [
  { label: 'Black', hex: '#36454f' }, { label: 'Blue', hex: '#0074d9' },
  { label: 'Pink', hex: '#f1a9c4' }, { label: 'Green', hex: '#5eb160' },
  { label: 'White', hex: '#ffffff' }, { label: 'Navy Blue', hex: '#3c4477' },
  { label: 'Purple', hex: '#800080' },
];
const DISCOUNT_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlQuery = searchParams.get('q') || '';
  const urlCat   = searchParams.get('cat') || '';
  const { toggleWishlist, isWishlisted, user } = useApp();

  const handleWishlist = (p) => {
    if (!user) { navigate('/profile'); return }
    toggleWishlist(p)
  }

  const [sortBy, setSortBy] = useState('recommended');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceMax, setPriceMax] = useState(3300);
  const [minDiscount, setMinDiscount] = useState(null);
  const [catSearch, setCatSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [colorSearch, setColorSearch] = useState('');

  const toggle = (setter, val) =>
    setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceMax(3300);
    setMinDiscount(null);
  };

  const activeFilterTags = [
    ...selectedCategories.map(v => ({ label: v, remove: () => toggle(setSelectedCategories, v) })),
    ...selectedBrands.map(v => ({ label: v, remove: () => toggle(setSelectedBrands, v) })),
    ...selectedColors.map(v => ({ label: v, remove: () => toggle(setSelectedColors, v) })),
    ...(minDiscount ? [{ label: `${minDiscount}%+ OFF`, remove: () => setMinDiscount(null) }] : []),
    ...(priceMax < 3300 ? [{ label: `Under ₹${priceMax}`, remove: () => setPriceMax(3300) }] : []),
  ];

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (urlQuery) list = list.filter(p =>
      p.product.toLowerCase().includes(urlQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(urlQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(urlQuery.toLowerCase())
    );
    if (urlCat) list = list.filter(p =>
      p.product.toLowerCase().includes(urlCat.toLowerCase()) ||
      p.brand.toLowerCase().includes(urlCat.toLowerCase()) ||
      p.category.toLowerCase().includes(urlCat.toLowerCase())
    );
    if (selectedCategories.length) list = list.filter(p => selectedCategories.includes(p.category));
    if (selectedBrands.length) list = list.filter(p => selectedBrands.includes(p.brand));
    if (selectedColors.length) list = list.filter(p => selectedColors.includes(p.color));
    if (priceMax < 3300) list = list.filter(p => p.discounted <= priceMax);
    if (minDiscount) list = list.filter(p => p.off >= minDiscount);

    switch (sortBy) {
      case 'price_asc': list.sort((a, b) => a.discounted - b.discounted); break;
      case 'price_desc': list.sort((a, b) => b.discounted - a.discounted); break;
      case 'discount': list.sort((a, b) => b.off - a.off); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [urlQuery, urlCat, selectedCategories, selectedBrands, selectedColors, priceMax, minDiscount, sortBy]);

  const filteredCats = CATEGORIES.filter(c => c.toLowerCase().includes(catSearch.toLowerCase()));
  const filteredBrands = BRANDS.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));
  const filteredColors = COLORS.filter(c => c.label.toLowerCase().includes(colorSearch.toLowerCase()));

  return (
    <>
      <div className="search-page">
        {/* Breadcrumbs */}
        <ul className="breadcrumbs-list">
          <li className="breadcrumbs-item"><a className="breadcrumbs-crumb" href="/">Home</a></li>
          <li className="breadcrumbs-item"><a className="breadcrumbs-crumb" href="/">Clothing</a></li>
          <li className="breadcrumbs-item"><span className="breadcrumbs-crumb">Womens Western Wear</span></li>
        </ul>

        <div className="title-container">
          <h1 className="title-title">
            {urlQuery ? `Results for "${urlQuery}"` : urlCat ? urlCat : 'Womens Western Wear'}
          </h1>
          <span className="title-count"> - {filtered.length} items</span>
        </div>

        <div className="search-layout">
          {/* LEFT FILTERS */}
          <aside className="vertical-filters">
            <div className="filter-header">
              <span className="filter-header-title">FILTERS</span>
              {activeFilterTags.length > 0 && (
                <button className="filter-clear-btn" onClick={clearAll}>CLEAR ALL</button>
              )}
            </div>

            {/* Categories */}
            <div className="filter-section">
              <span className="filter-section-title">Categories</span>
              <div className="filter-search-box">
                <FaSearch />
                <input value={catSearch} onChange={e => setCatSearch(e.target.value)} placeholder="Search for Categories" />
              </div>
              <ul className="filter-list">
                {filteredCats.map(c => (
                  <li key={c}><label>
                    <input type="checkbox" checked={selectedCategories.includes(c)} onChange={() => toggle(setSelectedCategories, c)} />
                    {c}
                  </label></li>
                ))}
              </ul>
            </div>

            {/* Brand */}
            <div className="filter-section">
              <span className="filter-section-title">Brand</span>
              <div className="filter-search-box">
                <FaSearch />
                <input value={brandSearch} onChange={e => setBrandSearch(e.target.value)} placeholder="Search for Brand" />
              </div>
              <ul className="filter-list">
                {filteredBrands.map(b => (
                  <li key={b}><label>
                    <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggle(setSelectedBrands, b)} />
                    {b}
                  </label></li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="filter-section">
              <span className="filter-section-title">Price</span>
              <input type="range" className="price-slider" min={100} max={3300} value={priceMax} onChange={e => setPriceMax(+e.target.value)} />
              <div className="price-range-display">₹0 – ₹{priceMax.toLocaleString()}{priceMax === 3300 ? '+' : ''}</div>
            </div>

            {/* Color */}
            <div className="filter-section">
              <span className="filter-section-title">Color</span>
              <div className="filter-search-box">
                <FaSearch />
                <input value={colorSearch} onChange={e => setColorSearch(e.target.value)} placeholder="Search for Color" />
              </div>
              <ul className="color-list">
                {filteredColors.map(c => (
                  <li key={c.label}>
                    <label className={selectedColors.includes(c.label) ? 'color-selected' : ''}>
                      <span className="color-swatch" style={{ backgroundColor: c.hex, border: c.hex === '#ffffff' ? '1px solid #d4d5d9' : 'none' }} />
                      {c.label}
                      <input type="checkbox" checked={selectedColors.includes(c.label)} onChange={() => toggle(setSelectedColors, c.label)} style={{ display: 'none' }} />
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discount */}
            <div className="filter-section">
              <span className="filter-section-title">Discount Range</span>
              <ul className="filter-list">
                {DISCOUNT_OPTIONS.map(d => (
                  <li key={d}><label>
                    <input type="radio" name="discount" checked={minDiscount === d} onChange={() => setMinDiscount(minDiscount === d ? null : d)} />
                    {d}% and above
                  </label></li>
                ))}
              </ul>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <div className="search-right">
            {/* Sort + quick filters */}
            <div className="horizontal-filters">
              <div className="sort-by">
                Sort by :&nbsp;
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="new">What's New</option>
                  <option value="popularity">Popularity</option>
                  <option value="discount">Better Discount</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
              <ul className="atsa-filters">
                {['Bundles', 'Country of Origin', 'Size'].map(f => (
                  <li key={f}><button>{f} ▾</button></li>
                ))}
              </ul>
            </div>

            {/* Active filter tags */}
            {activeFilterTags.length > 0 && (
              <div className="active-filters">
                {activeFilterTags.map(f => (
                  <div key={f.label} className="filter-tag">
                    {f.label}
                    <button onClick={f.remove}>✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* Products */}
            {filtered.length === 0 ? (
              <div className="no-results">No products match your filters. <button onClick={clearAll}>Clear all filters</button></div>
            ) : (
              <div className="products-grid">
                {filtered.map(p => (
                  <div key={p.id} className="plp-card">
                    <div className="plp-card-img-wrap">
                      <img className="plp-card-img" src={p.img} alt={p.product} loading="lazy" />
                      {p.isAd && <span className="plp-ad-badge">AD</span>}
                      <div className="plp-rating">
                        <span>{p.rating}</span>
                        <FaStar className="star" />
                        <span className="sep">|</span>
                        <span className="count">{p.ratingCount}</span>
                      </div>
                      <button className="plp-wishlist-btn" onClick={() => handleWishlist(p)}>
                        {isWishlisted(p.id) ? <FaHeart style={{ color: '#ff3f6c' }} /> : <FaRegHeart />}
                      </button>
                    </div>
                    <div className="plp-card-info">
                      <h3 className="plp-brand">{p.brand}</h3>
                      <h4 className="plp-product">{p.product}</h4>
                      <h4 className="plp-sizes">Sizes: <span>{p.sizes}</span></h4>
                      <div className="plp-price">
                        <span className="plp-discounted">Rs. {p.discounted}</span>
                        <span className="plp-strike">Rs. {p.strike}</span>
                        <span className="plp-off">({p.off}% OFF)</span>
                      </div>
                      {p.urgency && <div className="plp-urgency">{p.urgency}</div>}
                    </div>
                    <div className="view-similar">⊞ VIEW SIMILAR</div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length > 0 && (
              <div className="pagination">
                <button disabled>⟪ Page 1</button>
                <button disabled>← Previous</button>
                <span className="pagination-meta">Page 1 of 1</span>
                <button disabled>Next →</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
