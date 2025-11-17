# Wallet API - Presentation Script

## Overview Flow
**Code → UI → Working Demo**

---

## STEP 1: API Service Layer (Backend Code)
**File: `src/api/apiService.js`**

### 1.1 Base Configuration (Lines 1-11)
**What to explain:**
- "First, let's look at how we set up the API client"
- Show how we configure axios with the base URL
- Explain environment variable usage

**Lines to highlight:**
```javascript
Lines 1-11
- BASE_URL configuration
- Axios instance creation
- Default headers setup
```

**Script:**
> "We start by setting up our API client using Axios. Notice we use an environment variable for the base URL, which defaults to Covalent's API endpoint. This makes it easy to switch between environments."

---

### 1.2 Query String Builder Helper (Lines 13-29)
**What to explain:**
- "Before we make API calls, we need to build query strings properly"
- Show how we handle different parameter types (booleans, strings, etc.)
- Explain why we filter out false values for checkboxes

**Lines to highlight:**
```javascript
Lines 14-29
- buildQueryString function
- Parameter filtering logic
- Boolean handling
```

**Script:**
> "This helper function builds query strings from our parameters. Notice how we handle booleans - we only include 'true' values, which is important for checkbox parameters. This ensures clean API requests."

---

### 1.3 Get Token Balances Function (Lines 34-48)
**What to explain:**
- "This is the core function for getting token balances"
- Show path vs query parameter separation
- Explain the endpoint structure
- Show how parameters are filtered and passed

**Lines to highlight:**
```javascript
Lines 34-48
- Function signature: getTokenBalances(apiKey, chainId, address, params)
- Path parameter filtering (line 36)
- Query string building (lines 37-43)
- API endpoint construction (lines 44-46)
```

**Script:**
> "Here's our first Wallet API function - `getTokenBalances`. Notice how we separate path parameters (chainId, address) from query parameters. We destructure to remove path params from the query string, then build the URL with the API key and query parameters. The endpoint follows Covalent's structure: `/{chainId}/address/{address}/balances_v2/`"

**Key points:**
- Path parameters go in the URL path
- Query parameters go after the `?`
- API key is always included as a query parameter

---

### 1.4 Get Multichain Balances Function (Lines 50-67)
**What to explain:**
- "For multichain queries, we use a different endpoint"
- Show the `/allchains/` endpoint pattern
- Explain address handling (single address limitation)

**Lines to highlight:**
```javascript
Lines 50-67
- Address extraction logic (line 54)
- Multichain endpoint structure (line 64)
- Query parameter handling
```

**Script:**
> "For multichain balances, we use the `/allchains/` endpoint. Notice that even though the parameter is called 'addresses', the API only supports one address per call, so we extract the first address. The endpoint structure is `/allchains/address/{address}/balances/`"

---

### 1.5 Get ERC20 Transfers Function (Lines 69-82)
**What to explain:**
- "Transfers use a similar pattern but different endpoint"
- Show pagination parameters
- Explain optional contract filtering

**Lines to highlight:**
```javascript
Lines 69-82
- Transfer endpoint structure
- Pagination parameters (pageSize, pageNumber)
- Optional contract address filtering
```

**Script:**
> "For ERC20 transfers, we use the `/transfers_v2/` endpoint. This supports pagination and optional contract filtering. Notice the same pattern - path parameters in the URL, query parameters in the query string."

---

## STEP 2: Component Layer (UI Code)
**File: `src/components/WalletAPIs.jsx`**

### 2.1 Component Structure (Lines 1-10)
**What to explain:**
- "Now let's see how we use these functions in the UI"
- Show component imports and structure
- Explain the apiKey prop

**Lines to highlight:**
```javascript
Lines 1-10
- Component imports
- Props (apiKey)
- Component structure
```

**Script:**
> "This component renders all Wallet API endpoints. It receives the API key as a prop and renders multiple `ApiTestForm` components, one for each endpoint."

---

### 2.2 First API Form - Token Balances (Lines 11-23)
**What to explain:**
- "Each form is configured with fields and an onSubmit handler"
- Show field definitions
- Explain how onSubmit connects to the API service

**Lines to highlight:**
```javascript
Lines 11-23
- ApiTestForm component
- Field definitions (chainId, address, quoteCurrency, etc.)
- onSubmit handler (line 21) - connects to apiService.getTokenBalances
```

**Script:**
> "Here's our first form - 'Get Token Balances'. Notice the fields array defines what inputs the user sees. The `onSubmit` prop connects directly to our API service function. When the user submits, it calls `apiService.getTokenBalances` with the API key and form data."

**Key points:**
- Fields define the UI inputs
- onSubmit is the bridge between UI and API service
- Form data is automatically collected and passed

---

### 2.3 Second API Form - Multichain Balances (Lines 25-36)
**What to explain:**
- "Multichain form uses different fields"
- Show address-only input (no chainId needed)
- Explain optional chains parameter

**Lines to highlight:**
```javascript
Lines 25-36
- Different field structure
- Single address input
- Optional chains parameter
- onSubmit connects to getMultichainBalances
```

**Script:**
> "The multichain form is simpler - it only needs an address since it queries across all chains. The chains parameter is optional - if omitted, it queries all foundational chains."

---

### 2.4 Third API Form - ERC20 Transfers (Lines 38-50)
**What to explain:**
- "Transfers form includes pagination"
- Show pageSize and pageNumber fields
- Explain optional contract filtering

**Lines to highlight:**
```javascript
Lines 38-50
- Transfer-specific fields
- Pagination fields
- Optional contract address
```

**Script:**
> "The transfers form includes pagination controls and an optional contract address filter. This allows users to see all transfers or filter by a specific token."

---

## STEP 3: Form Component (Reusable UI)
**File: `src/components/ApiTestForm.jsx`**

### 3.1 Component Setup (Lines 1-9)
**What to explain:**
- "This is a reusable form component"
- Show state management
- Explain useId for unique form IDs

**Lines to highlight:**
```javascript
Lines 1-9
- useState hooks (formData, response, loading, error)
- useId for unique form field IDs
- Component props
```

**Script:**
> "This is our reusable form component. It manages its own state - form data, API response, loading state, and errors. We use React's `useId` hook to generate unique IDs for form fields, preventing conflicts when multiple forms are on the same page."

---

### 3.2 Form Data Handling (Lines 11-17)
**What to explain:**
- "How form inputs update state"
- Show handleChange function
- Explain checkbox vs text input handling

**Lines to highlight:**
```javascript
Lines 11-17
- handleChange function
- Checkbox vs text input logic
- State updates
```

**Script:**
> "The `handleChange` function updates our form state. Notice it handles both text inputs and checkboxes differently - checkboxes use the `checked` property, while text inputs use `value`."

---

### 3.3 Form Submission (Lines 19-33)
**What to explain:**
- "This is where the magic happens - connecting UI to API"
- Show async/await pattern
- Explain error handling
- Show loading state management

**Lines to highlight:**
```javascript
Lines 19-33
- handleSubmit function
- Loading state management
- Error handling
- API call via onSubmit prop
- Response state update
```

**Script:**
> "When the form is submitted, we prevent default behavior, set loading to true, clear previous errors, and call the `onSubmit` function passed as a prop. This function receives the API key and form data, makes the API call, and returns the response. We handle errors gracefully and update the response state."

**Key points:**
- onSubmit prop is the API service function
- Loading state provides user feedback
- Errors are caught and displayed

---

### 3.4 Form Rendering (Lines 40-96)
**What to explain:**
- "How the form renders dynamically"
- Show field mapping
- Explain different input types (text, checkbox, select)
- Show submit button with loading state

**Lines to highlight:**
```javascript
Lines 40-96
- Form JSX structure
- Field mapping (lines 48-91)
- Dynamic input rendering based on type
- Submit button with disabled state
```

**Script:**
> "The form renders dynamically based on the fields array. For each field, we check its type and render the appropriate input - text, checkbox, or select. The submit button is disabled when loading or when no API key is set."

---

### 3.5 Response Display (Lines 105-112)
**What to explain:**
- "After API call, we display the response"
- Show ResponseDisplay component
- Explain copy to clipboard feature

**Lines to highlight:**
```javascript
Lines 105-112
- Response container
- Copy button
- ResponseDisplay component
```

**Script:**
> "Once we get a response, we render it using the `ResponseDisplay` component. Users can also copy the raw JSON to clipboard for further analysis."

---

## STEP 4: Response Display (Data Visualization)
**File: `src/components/ResponseDisplay.jsx`**

### 4.1 Data Extraction (Lines 230-253)
**What to explain:**
- "First, we extract items from the API response"
- Show getDataItems function
- Explain different response structures

**Lines to highlight:**
```javascript
Lines 230-253
- getDataItems function
- Multiple response structure handling
- Array extraction logic
```

**Script:**
> "The API can return data in different structures. This function checks for `data.items`, `items`, `data` array, or wraps a single object. This makes our component flexible to handle various API response formats."

---

### 4.2 Token Balance Formatting (Lines 17-32)
**What to explain:**
- "We format token balances using contract decimals"
- Show formatTokenBalance function
- Explain decimal conversion

**Lines to highlight:**
```javascript
Lines 17-32
- formatTokenBalance function
- Decimal conversion (line 24)
- Number formatting
```

**Script:**
> "Token balances come as raw numbers. We divide by 10^decimals to get the human-readable value. For example, 1420000000 with 10 decimals becomes 0.142."

---

### 4.3 Card Rendering for Tokens (Lines 84-154)
**What to explain:**
- "We render token data in beautiful cards"
- Show token card structure
- Explain logo, name, balance display
- Show chain information

**Lines to highlight:**
```javascript
Lines 84-154
- renderCard function for tokens
- Logo handling (lines 90-99)
- Balance display (line 117)
- Chain information (lines 125-130)
```

**Script:**
> "For token balance responses, we render custom cards. Each card shows the token logo, name, ticker symbol, balance (properly formatted with decimals), price in USD, chain information, and contract address. The cards are visually distinct with colored left borders."

---

### 4.4 Pagination (Lines 255-279)
**What to explain:**
- "We paginate results for better UX"
- Show pagination logic
- Explain page calculation

**Lines to highlight:**
```javascript
Lines 255-279
- Pagination state and logic
- Page calculation
- Item slicing
```

**Script:**
> "We paginate results, showing 5 items per page. The pagination automatically resets to page 1 when new data arrives, and provides Previous/Next buttons plus page number buttons."

---

## STEP 5: Page Wrapper (Routing)
**File: `src/pages/WalletPage.jsx`**

### 5.1 Page Component (Lines 1-16)
**What to explain:**
- "This is the page-level component"
- Show API key context usage
- Explain routing structure

**Lines to highlight:**
```javascript
Lines 1-16
- useApiKey hook
- WalletAPIs component rendering
- Page wrapper structure
```

**Script:**
> "This page component uses the API key from context and renders the WalletAPIs component. It's connected to React Router, so it displays when users navigate to `/wallet`."

---

## STEP 6: Live Demo Flow

### Demo Script:

1. **Navigate to Wallet API Page**
   - "Let's navigate to the Wallet API page"
   - Show the sidebar navigation
   - Click on "Wallet API"

2. **Show the Three Forms**
   - "Here we have three Wallet API endpoints"
   - Point out: Token Balances, Multichain Balances, ERC20 Transfers

3. **Fill Out First Form - Token Balances**
   - "Let's test the first endpoint - Get Token Balances"
   - Enter Chain ID: `1` (Ethereum)
   - Enter Address: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` (Vitalik's address)
   - Leave quote currency as USD
   - Check "No Spam" to filter spam tokens
   - Click "Test API"

4. **Show Loading State**
   - "Notice the button shows 'Loading...' and is disabled"
   - "This prevents multiple simultaneous requests"

5. **Show Response**
   - "Here's the API response displayed in cards"
   - Point out:
     - Token logos
     - Token names and symbols
     - Formatted balances (with decimals!)
     - USD values
     - Chain information
   - "Notice the pagination - we're showing 5 items at a time"

6. **Switch to JSON View**
   - "We can also view the raw JSON response"
   - Click "JSON" button
   - "This is useful for developers who want to see the exact API response structure"

7. **Test Multichain Balances**
   - "Now let's test multichain balances"
   - Enter the same address
   - "This queries across all chains, not just one"
   - Show how results include chain information

8. **Test ERC20 Transfers**
   - "Finally, let's see token transfers"
   - Enter chain ID and address
   - "This shows the transfer history for this address"
   - Point out pagination controls

---

## Key Takeaways to Emphasize

1. **Separation of Concerns**
   - API service layer (business logic)
   - Component layer (UI)
   - Clear separation makes code maintainable

2. **Reusability**
   - ApiTestForm is used for all endpoints
   - ResponseDisplay handles all response types
   - DRY principle in action

3. **User Experience**
   - Loading states
   - Error handling
   - Beautiful card display
   - Pagination for large datasets
   - Multiple view modes (cards/JSON)

4. **Data Flow**
   ```
   User Input → Form State → API Service → API Call → Response → Display
   ```

5. **Type Safety & Validation**
   - Required fields
   - Input validation
   - Error messages

---

## Presentation Tips

1. **Start with Code**: Show the API service functions first
2. **Then UI**: Show how components use those functions
3. **Live Demo**: Actually test the API with real data
4. **Highlight Features**: 
   - Decimal formatting
   - Pagination
   - Error handling
   - Multiple view modes
5. **Explain Architecture**: Why we structured it this way

---

## Files Summary

| File | Purpose | Key Lines |
|------|---------|-----------|
| `apiService.js` | API functions | 34-48, 50-67, 69-82 |
| `WalletAPIs.jsx` | Endpoint definitions | 11-23, 25-36, 38-50 |
| `ApiTestForm.jsx` | Reusable form | 19-33, 40-96 |
| `ResponseDisplay.jsx` | Response rendering | 17-32, 84-154, 255-279 |
| `WalletPage.jsx` | Page wrapper | 1-16 |


