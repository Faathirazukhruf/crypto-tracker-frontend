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
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [priceHistory, setPriceHistory] = useState([]);

  // Fetch crypto prices from backend
  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get("/api/crypto-prices");
      setCryptoPrices(response.data);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
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
  }, [selectedCrypto]);

  // Chart data
  const chartData = {
    labels: priceHistory.map((price) => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: priceHistory.map((price) => price[1]),
        borderColor: "#00ff88", // Neon green
        backgroundColor: "rgba(0, 255, 136, 0.2)", // Light neon green
      },
    ],
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Crypto Price Tracker</h1>
        <button className="connect-wallet-button" onClick={connectWallet}>
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect MetaMask"}
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
              <span>{crypto.toUpperCase()}</span>: ${data.usd}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Trend Section */}
      <div className="price-trend">
        <h2>Price Trend</h2>
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
          <Line data={chartData} />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Crypto Price Tracker. Made by Faathirazukhruf.</p>
      </footer>
    </div>
  );
}