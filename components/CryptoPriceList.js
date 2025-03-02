import React from "react";

const CryptoPriceList = ({ cryptoPrices }) => {
  return (
    <div>
      <h2>Crypto Prices</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {Object.entries(cryptoPrices).map(([crypto, data]) => (
          <li key={crypto} style={{ margin: "10px 0", fontSize: "1.2em" }}>
            <span style={{ fontWeight: "bold" }}>{crypto.toUpperCase()}</span>: $
            {data.usd}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoPriceList;