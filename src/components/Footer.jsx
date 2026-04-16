import './Footer.css'

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">

    {/* Top Links Section */}
    <div className="footer-generic-info">

      <div className="footer-col">
        <p className="footer-title">ONLINE SHOPPING</p>
        <a href="/shop/men">Men</a>
        <a href="/shop/women">Women</a>
        <a href="/shop/kids">Kids</a>
        <a href="/shop/home-living">Home</a>
        <a href="/personal-care">Beauty</a>
        <a href="/shop/fwd-women">Genz</a>
        <a href="/giftcard">Gift Cards</a>
        <a href="/myntrainsider">Myntra Insider</a>

        <p className="footer-title" style={{marginTop:'16px'}}>USEFUL LINKS</p>
        <a href="http://blog.myntra.com/">Blog</a>
        <a href="https://careers.myntra.com">Careers</a>
        <a href="/sitemap">Site Map</a>
        <a href="/corp-info">Corporate Information</a>
        <a href="/security/whitehat">Whitehat</a>
        <a href="https://www.cleartrip.com/">Cleartrip</a>
        <a href="https://www.myntraglobal.com/">Myntra Global</a>
      </div>

      <div className="footer-col">
        <p className="footer-title">CUSTOMER POLICIES</p>
        <a href="/contactus">Contact Us</a>
        <a href="/faqs">FAQ</a>
        <a href="/tac">T&amp;C</a>
        <a href="/termsofuse">Terms Of Use</a>
        <a href="/my/orders">Track Orders</a>
        <a href="/faqs#shipping">Shipping</a>
        <a href="/faqs#cancel">Cancellation</a>
        <a href="/privacypolicy">Privacy policy</a>
        <a href="/grievanceredressal">Grievance Redressal</a>
        <a href="https://fssai.gov.in/cms/food-safety-connect.php">FSSAI Food Safety Connect app</a>
      </div>

      <div className="footer-col">
        <p className="footer-title">EXPERIENCE MYNTRA APP ON MOBILE</p>
        <div className="footer-app-links">
          <a href="https://play.google.com/store/apps/details?id=com.myntra.android">
            <img src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png" alt="Google Play" />
          </a>
          <a href="https://itunes.apple.com/in/app/myntra-indias-fashion-store/id907394059">
            <img src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png" alt="App Store" />
          </a>
        </div>
        <p className="footer-title" style={{marginTop:'16px'}}>KEEP IN TOUCH</p>
        <div className="footer-social">
          <img src="https://constant.myntassets.com/web/assets/img/d2bec182-bef5-4fab-ade0-034d21ec82e31574604275433-fb.png" alt="Facebook" />
          <img src="https://constant.myntassets.com/web/assets/img/f10bc513-c5a4-490c-9a9c-eb7a3cc8252b1574604275383-twitter.png" alt="Twitter" />
          <img src="https://constant.myntassets.com/web/assets/img/a7e3c86e-566a-44a6-a733-179389dd87111574604275355-yt.png" alt="YouTube" />
          <img src="https://constant.myntassets.com/web/assets/img/b4fcca19-5fc1-4199-93ca-4cae3210ef7f1574604275408-insta.png" alt="Instagram" />
        </div>
      </div>

      <div className="footer-col footer-col-promises">
        <div className="footer-promise-item">
          <img src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png" alt="Original" />
          <span><strong>100% ORIGINAL</strong> guarantee for all products at myntra.com</span>
        </div>
        <div className="footer-promise-item">
          <img src="https://assets.myntassets.com/assets/images/retaillabs/2023/5/22/becb1b16-86cc-4e78-bdc7-7801c17947831684737106127-Return-Window-image.png" alt="Return" />
          <span><strong>Return within 14days</strong> of receiving your order</span>
        </div>
      </div>

    </div>

    {/* Popular Searches */}
    <div className="footer-popular">
      <hr />
      <p className="footer-title">POPULAR SEARCHES</p>
      <div className="footer-popular-links">
        {['Makeup','Dresses For Girls','T-Shirts','Sandals','Headphones','Babydolls','Blazers For Men','Handbags','Ladies Watches','Bags','Sport Shoes','Reebok Shoes','Puma Shoes','Boxers','Wallets','Tops','Earrings','Fastrack Watches','Kurtis','Nike','Smart Watches','Titan Watches','Designer Blouse','Gowns','Rings','Cricket Shoes','Forever 21','Eye Makeup','Photo Frames','Punjabi Suits','Bikini','Myntra Fashion Show','Lipstick','Saree','Watches','Dresses','Lehenga','Nike Shoes','Goggles','Bras','Suit','Chinos','Shoes','Adidas Shoes','Woodland Shoes','Jewellery','Designers Sarees'].map(term => (
          <a key={term} href="/">{term}</a>
        ))}
      </div>
    </div>

    {/* Bottom Info */}
    <div className="footer-bottom-info">
      <div className="footer-contact">In case of any concern, <a href="/contactus">Contact Us</a></div>
      <div className="footer-copyright">© 2026 www.myntra.com. All rights reserved.</div>
      <div className="footer-flipkart"><a href="https://www.flipkart.com/">A Flipkart company</a></div>
    </div>

    {/* Address */}
    <address className="footer-address">
      <p className="footer-title">Registered Office Address</p>
      <div className="footer-address-content">
        <div>
          Buildings Alyssa,<br />
          Begonia and Clover situated in Embassy Tech Village,<br />
          Outer Ring Road,<br />
          Devarabeesanahalli Village,<br />
          Varthur Hobli,<br />
          Bengaluru – 560103, India
        </div>
        <div className="footer-legal">
          <p>CIN: U72300KA2007PTC041799</p>
          <p>Telephone: <a href="tel:080-40011450">080‑40011450</a></p>
        </div>
      </div>
    </address>

    {/* SEO Content */}
    <div className="footer-seo">
      <h1><strong>ONLINE SHOPPING MADE EASY AT MYNTRA</strong></h1>
      <p>If you would like to experience the best of online shopping for men, women and kids in India, you are at the right place. Myntra is the ultimate destination for fashion and lifestyle, being host to a wide array of merchandise including clothing, footwear, accessories, jewellery, personal care products and more.</p>

      <h3><strong>BEST ONLINE SHOPPING SITE IN INDIA FOR FASHION</strong></h3>
      <p>Be it clothing, footwear or accessories, Myntra offers you the ideal combination of fashion and functionality for men, women and kids.</p>
      <ul>
        <li><strong>Smart men's clothing</strong> - At Myntra you will find myriad options in smart formal shirts and trousers, cool T-shirts and jeans, or kurta and pyjama combinations for men.</li>
        <li><strong>Trendy women's clothing</strong> - Online shopping for women at Myntra is a mood-elevating experience.</li>
        <li><strong>Fashionable footwear</strong> - We bring you an exhaustive lineup of options in casual shoes for men, such as sneakers and loafers.</li>
        <li><strong>Stylish accessories</strong> - Myntra is one of the best online shopping sites for classy accessories.</li>
        <li><strong>Fun and frolic</strong> - Online shopping for kids at Myntra is a complete joy.</li>
        <li><strong>Beauty begins here</strong> - Refresh, rejuvenate and reveal beautiful skin with personal care, beauty and grooming products from Myntra.</li>
      </ul>

      <h3><strong>AFFORDABLE FASHION AT YOUR FINGERTIPS</strong></h3>
      <p>Myntra is one of the unique online shopping sites in India where fashion is accessible to all.</p>

      <h3><strong>MYNTRA INSIDER</strong></h3>
      <p>Every online shopping experience is precious. Hence, a cashless reward-based customer loyalty program called Myntra Insider was introduced to enhance your online experience.</p>

      <h3><strong>MYNTRA APP</strong></h3>
      <p>Myntra, India's no. 1 online fashion destination justifies its fashion relevance by bringing something new and chic to the table on the daily.</p>

      <h3><strong>HISTORY OF MYNTRA</strong></h3>
      <p>Becoming India's no. 1 fashion destination is not an easy feat. The original B2B venture for personalized gifts was conceived in 2007 but transitioned into a full-fledged ecommerce giant within a span of just a few years.</p>

      <h3><strong>SHOP ONLINE AT MYNTRA WITH COMPLETE CONVENIENCE</strong></h3>
      <p>Another reason why Myntra is the best of all online stores is the complete convenience that it offers. You can view your favourite brands with price options for different products in one place.</p>
    </div>

    </div>
  </footer>
)

export default Footer
