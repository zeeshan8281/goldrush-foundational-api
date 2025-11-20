# GoldRush Foundational API UI

A comprehensive React-based UI for testing all GoldRush Foundational API endpoints from Covalent. This application provides an intuitive interface to explore and test blockchain data APIs across multiple chains.

## Features

- **6 API Categories**: Organized navigation for different API types matching Covalent's documentation
- **28+ Endpoints**: Complete coverage of all foundational API endpoints
- **Beautiful Card Display**: All response data displayed in formatted cards with proper styling
- **Dynamic Data Rendering**: Automatically displays all fields from API responses (excluding error fields)
- **Clickable URLs**: Logo URLs and other URLs are displayed as clickable hyperlinks
- **JSON View Toggle**: Switch between card view and raw JSON view
- **Easy API Testing**: Simple forms for each endpoint with required and optional parameters
- **Error Handling**: Clear error messages for failed requests
- **Modern UI**: Dark theme with responsive design

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open your browser** to the URL shown in the terminal (typically `http://localhost:5173`)

4. **Enter your API key** in the header and click "Set API Key"

5. **Navigate through the APIs** using the sidebar to test different endpoints

## API Key

You'll need a GoldRush API key from [Covalent](https://www.covalenthq.com/). Once you have it, enter it in the header of the application. The API key is stored in context and used for all API requests.

## Project Structure

```
├── src/
│   ├── api/
│   │   └── apiService.js          # Centralized API service with all endpoints
│   ├── components/
│   │   ├── ApiTestForm.jsx         # Reusable form component for API testing
│   │   ├── ResponseDisplay.jsx     # Component for displaying API responses in cards/JSON
│   │   ├── Layout.jsx              # Main layout with sidebar navigation
│   │   ├── WalletAPIs.jsx          # Wallet API endpoints
│   │   ├── ActivityFeedAPIs.jsx    # Activity Feed API endpoints
│   │   ├── NFTAPIs.jsx             # NFT API endpoints
│   │   ├── BitcoinAPIs.jsx         # Bitcoin API endpoints
│   │   ├── SecurityAPIs.jsx       # Security API endpoints
│   │   └── BlockExplorerAPIs.jsx   # Block Explorer API endpoints
│   ├── pages/
│   │   ├── Home.jsx                # Home page with API category cards
│   │   ├── WalletPage.jsx          # Wallet API page
│   │   ├── ActivityFeedPage.jsx    # Activity Feed API page
│   │   ├── NFTsPage.jsx            # NFT API page
│   │   ├── BitcoinPage.jsx         # Bitcoin API page
│   │   ├── SecurityPage.jsx        # Security API page
│   │   └── BlockExplorerPage.jsx   # Block Explorer API page
│   ├── context/
│   │   └── ApiKeyContext.jsx       # Context for managing API key globally
│   ├── App.jsx                     # Main application component with routing
│   ├── App.css                     # Application styles
│   └── main.jsx                    # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Available APIs

### 1. Wallet API 💰
Multichain token balances (ERC20, 721, 1155, native), token transfers and prices (spot and historical) for a wallet.

**Endpoints:**
- Get Token Balances for Address
- Get Multichain Balances
- Get ERC20 Token Transfers for Address
- Get Historical Token Prices
- Get Pool Spot Prices
- Get Resolved Address for Registered Address

### 2. Activity Feed API 📊
Multichain historical transactions with human-readable event logs and historical prices. Includes transaction count and gas usage/spend summaries.

**Endpoints:**
- Get Activity Across All Chains for Address
- Get Transaction by Hash
- Get Transaction Summary for Address
- Get Recent Transactions for Address
- Get Paginated Transactions for Address
- Get Bulk Time Bucket Transactions
- Get Multichain & Multiaddress Transactions

### 3. NFT API 🖼️
Media assets, metadata, sales, owners, trait and attribute filters, thumbnail previews.

**Endpoints:**
- Get NFT
- Request Collection Cache
- Get Collection Cache Status

### 4. Bitcoin API ₿
Bitcoin balances and transactions for x/y/zpub and non-HD addresses, including historical and spot prices.

**Endpoints:**
- Get Bitcoin Balances
- Get Bitcoin Transactions
- Get Bitcoin Transaction by Hash

### 5. Security API 🔒
NFT and ERC20 token allowances, including value-at-risk.

**Endpoints:**
- Get Token Approvals for Address

### 6. Block Explorer API 🧱
Block details, event logs by contract address or topic hash, gas prices, token prices & holders.

**Endpoints:**
- Get Block by Height
- Get All Transactions in a Block by Page
- Get All Transactions in a Block by Hash
- Get Logs
- Get Log Events by Contract Address
- Get Token Holders as of Block Height
- Get All Chains
- Get All Chain Statuses

## Response Display

All API responses are displayed in beautiful card format with:
- **Automatic field detection**: All fields from the response are displayed (except error fields)
- **Smart formatting**: Addresses, numbers, currencies, dates, and booleans are formatted appropriately
- **Nested object support**: Nested objects and arrays are displayed recursively
- **URL hyperlinks**: Logo URLs and other URLs are clickable (logo URLs show as text links)
- **Pagination**: Large responses are paginated for better performance
- **JSON toggle**: Switch to raw JSON view for debugging

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Modern CSS** - Flexbox/Grid layouts with CSS variables for theming

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## License

MIT

## Repository

[GitHub Repository](https://github.com/zeeshan8281/goldrush-foundational-api)
