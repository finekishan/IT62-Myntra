import { useEffect, useRef, useState } from "react";
import "./BankOffers.css";

const staticBankOffers = [
  { 
    id: 1, 
    bankName: "HDFC BANK",  
    title: "10% Instant Discount", 
    subtitle: "On HDFC Credit Card EMI Transactions*",  
    tcText: "*T&C Apply", 
    theme: "hdfc",  
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg" 
  },
  { 
    id: 2, 
    bankName: "SBI BANK",   
    title: "10% Instant Discount", 
    subtitle: "On SBI Credit Card Transactions*",        
    tcText: "*T&C Apply", 
    theme: "sbi",   
    logo: "https://upload.wikimedia.org/wikipedia/en/5/58/State_Bank_of_India_logo.svg" 
  },
  { 
    id: 3, 
    bankName: "ICICI BANK", 
    title: "12% Instant Discount", 
    subtitle: "On ICICI Credit Card EMI Orders*",        
    tcText: "*T&C Apply", 
    theme: "icici", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg" 
  },
  { 
    id: 4, 
    bankName: "AXIS BANK",  
    title: "10% Instant Discount", 
    subtitle: "On Axis Bank Credit Card Orders*",        
    tcText: "*T&C Apply", 
    theme: "axis",  
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg" 
  },
];

const BankOfferCard = ({ item }) => (
  <div className="bankOfferCard">
    <div className="bankOfferLeft">
      <div className={`bankLogoBox ${item.theme}`}>
        <img src={item.logo} alt={item.bankName} className="bankLogoImg" />
        <div className="bankNameText">{item.bankName}</div>
      </div>
    </div>
    <div className="bankDivider"></div>
    <div className="bankOfferContent">
      <h3>{item.title}</h3>
      <p>{item.subtitle}</p>
    </div>
    <div className="bankApplyTag">
      <span>{item.tcText || "*T&C Apply"}</span>
      <div className="bankRightPerforation">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
);

const BankOffers = () => {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const lengthRef = useRef(staticBankOffers.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % lengthRef.current);
        setFlipping(false);
      }, 400);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bankOffersSection">
      <div className="bankOffersGrid">
        <div className={`bankFlipWrapper${flipping ? " flipping" : ""}`}>
          <BankOfferCard item={staticBankOffers[current]} />
        </div>
      </div>
      <div className="budgetHeadingStrip">
        <h2>Budget-Friendly Picks</h2>
      </div>
    </section>
  );
};

export default BankOffers;