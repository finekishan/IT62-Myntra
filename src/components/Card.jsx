import { useNavigate } from 'react-router-dom'
import './Card.css'

const Card = ({ image, discount, description, brandLogo, brandName }) => {
  const navigate = useNavigate()

  return (
    <div className="card" onClick={() => navigate('/clothing/womens-western-wear')} style={{ cursor: 'pointer' }}>
      <div className="card-img-wrapper">
        <img src={image} alt={description} className="card-img" />
        <div className="card-bottom-overlay">
          <div className="card-brand-row">
            {brandLogo && <img src={brandLogo} alt={brandName} className="card-brand-logo" />}
            {brandName && <span className="card-brand-name">{brandName}</span>}
          </div>
          {description && <p className="card-description">{description}</p>}
          {discount && <span className="card-discount">{discount}</span>}
        </div>
      </div>
    </div>
  )
}

export default Card
