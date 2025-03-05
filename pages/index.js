import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [priceHistory, setPriceHistory] = useState([]);

  // Fetch crypto prices from backend
  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get("/api/crypto-prices");
      setPreviousPrices(cryptoPrices); // Store previous prices
      setCryptoPrices(response.data);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
  };

  // Determine price change color
  const getPriceChangeClass = (crypto) => {
    if (!previousPrices[crypto]) return '';
    
    const currentPrice = cryptoPrices[crypto]?.usd;
    const previousPrice = previousPrices[crypto]?.usd;
    
    if (currentPrice > previousPrice) return 'price-positive';
    if (currentPrice < previousPrice) return 'price-negative';
    return '';
  };

  // Fetch price history for selected crypto
  const fetchPriceHistory = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=usd&days=7`
      );
      setPriceHistory(response.data.prices);
    } catch (error) {
      console.error("Error fetching price history:", error);
    }
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        setWalletAddress(address);
        setWalletBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
    fetchPriceHistory();
    
    // Fetch prices every 30 seconds
    const intervalId = setInterval(fetchCryptoPrices, 30000);
    return () => clearInterval(intervalId);
  }, [selectedCrypto]);

  // Chart configuration for better responsiveness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedCrypto.toUpperCase()} Price Trend`,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          autoSkipPadding: 10,
        },
      },
      y: {
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  // Chart data
  const chartData = {
    labels: priceHistory.map((price) => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: priceHistory.map((price) => price[1]),
        borderColor: "#00ff88", // Neon green
        backgroundColor: "rgba(0, 255, 136, 0.2)", // Light neon green
        tension: 0.4, // Smooth curve
        pointRadius: 5, // Larger points
        pointHoverRadius: 8, // Larger points on hover
      },
    ],
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Crypto Price Tracker</h1>
        <button className="connect-wallet-button" onClick={connectWallet}>
          {walletAddress ? (
            `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          ) : (
            <>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                alt="MetaMask Logo" 
                style={{
                  width: '24px', 
                  height: '24px', 
                  marginRight: '10px', 
                  verticalAlign: 'middle'
                }} 
              />
              Connect MetaMask
            </>
          )}
        </button>
      </div>

      {/* Wallet Info */}
      {walletAddress && (
        <p className="wallet-info">Balance: {parseFloat(walletBalance).toFixed(4)} ETH</p>
      )}

      {/* Crypto Price List */}
      <div className="crypto-price-list">
        <h2>Crypto Prices</h2>
        <ul>
          {Object.entries(cryptoPrices).map(([crypto, data]) => (
            <li key={crypto}>
              <span>{crypto.toUpperCase()}</span>: 
              <span className={getPriceChangeClass(crypto)}>
                ${data.usd}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Trend Section */}
      <div className="price-trend">
        <h2>Price Trend =    </h2>
        <select
          className="crypto-select"
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="ripple">Ripple</option>
        </select>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Crypto Price Tracker. Made by Faathirazukhruf.</p>
      </footer>
    </div>
  );
}