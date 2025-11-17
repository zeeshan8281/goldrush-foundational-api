# GoldRush Foundational API UI

A comprehensive UI for testing all GoldRush Foundational API endpoints in a single page application.

## Features

- **10 API Categories**: Organized tabs for different API types
  - Balances
  - Transfers
  - Activity
  - Transactions
  - Blocks
  - NFTs
  - Security
  - Pricing
  - Events/Logs
  - Utility

- **Easy API Testing**: Simple forms for each endpoint with required and optional parameters
- **Response Viewer**: Pretty-printed JSON responses with copy functionality
- **Error Handling**: Clear error messages for failed requests
- **Modern UI**: Clean, responsive design with gradient header and tabbed interface

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

4. Enter your GoldRush API key in the header and click "Set API Key"

5. Navigate through the tabs to test different API endpoints

## API Key

You'll need a GoldRush API key from [Covalent](https://www.covalenthq.com/). Once you have it, enter it in the header of the application.

## Project Structure

```
├── src/
│   ├── api/
│   │   └── apiService.js       # API service layer with all endpoints
│   ├── components/
│   │   ├── ApiTestForm.jsx      # Reusable form component
│   │   ├── BalanceAPIs.jsx      # Balance-related endpoints
│   │   ├── TransferAPIs.jsx     # Transfer endpoints
│   │   ├── ActivityAPIs.jsx     # Activity endpoints
│   │   ├── TransactionAPIs.jsx  # Transaction endpoints
│   │   ├── BlockAPIs.jsx        # Block endpoints
│   │   ├── NFTAPIs.jsx          # NFT endpoints
│   │   ├── SecurityAPIs.jsx     # Security endpoints
│   │   ├── PricingAPIs.jsx      # Pricing endpoints
│   │   ├── EventAPIs.jsx        # Event/Log endpoints
│   │   └── UtilityAPIs.jsx      # Utility endpoints
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Application styles
│   └── main.jsx                 # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Available Endpoints

### Balances
- Get Token Balances for Address
- Get Multichain Balances

### Transfers
- Get ERC20 Token Transfers for Address

### Activity
- Get Activity Across All Chains for Address

### Transactions
- Get Transaction by Hash
- Get Transaction Summary for Address
- Get Recent Transactions for Address
- Get Paginated Transactions for Address
- Get Bulk Transactions for Address
- Get Bulk Time Bucket Transactions
- Get Multichain & Multiaddress Transactions

### Blocks
- Get Block by Height
- Get All Transactions in a Block by Page
- Get All Transactions in a Block by Hash

### NFTs
- Get NFT
- Request Collection Cache
- Get Collection Cache Status

### Security
- Get Token Approvals for Address

### Pricing
- Get Historical Token Prices
- Get Pool Spot Prices

### Events/Logs
- Get Logs
- Get Log Events by Contract Address
- Get Token Holders as of Block Height

### Utility
- Get All Chains
- Get All Chain Statuses
- Get Resolved Address for Registered Address

## Technologies

- React 18
- Vite
- Axios
- Modern CSS with Flexbox/Grid

## License

MIT


