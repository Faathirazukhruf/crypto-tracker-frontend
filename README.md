# Crypto Price Tracker with Wallet Integration


## About the Project

This is a personal project created by **Faathirazukhruf**. It is a web application for tracking real-time cryptocurrency prices and integrating with MetaMask wallets. The application is built using **Next.js** for the frontend and **CoinGecko API** to fetch cryptocurrency price data.

Key Features:
- Display real-time cryptocurrency prices (Bitcoin, Ethereum, Ripple).
- Integrate with MetaMask to display wallet address and balance.
- Price trend charts using **Chart.js**.
- Responsive design for both mobile and desktop devices.

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org/) - React framework for building web applications.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Chart.js](https://www.chartjs.org/) - Library for creating charts.
  - [ethers.js](https://docs.ethers.io/) - Library for interacting with Ethereum and MetaMask.

- **Backend**:
  - [CoinGecko API](https://www.coingecko.com/en/api) - API for fetching cryptocurrency price data.

- **Styling**:
  - CSS Modules - For component styling.
  - Google Fonts (Inter) - For the font used in the project.

## How to Run the Project

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Faathirazukhruf/crypto-tracker-frontend.git
   cd crypto-tracker-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
crypto-tracker-frontend/
├── public/                  # Folder for static assets (e.g., images, icons)
├── styles/                  # Folder for CSS files
│   └── globals.css          # Global CSS file
├── pages/                   # Folder for pages and API routes
│   ├── api/                 # Folder for Serverless Functions
│   │   └── crypto-prices.js # Example API route
│   ├── index.js             # Main landing page
│   └── _app.js              # Custom App component
├── components/              # Folder for reusable components
│   └── CryptoPriceList.js   # Component for displaying crypto prices
├── package.json             # File for dependencies and scripts
├── next.config.js           # Next.js configuration (optional)
└── README.md                # Project documentation
```

## Contributing

This is a personal project created by **Faathirazukhruf**. If you'd like to contribute or provide feedback, please open an **issue** or **pull request** in this repository.

## License

This project is licensed under the [MIT License](LICENSE).

---

Made by **Faathirazukhruf**.


