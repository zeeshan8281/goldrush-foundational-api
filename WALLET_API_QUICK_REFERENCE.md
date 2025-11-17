# Wallet API - Quick Reference Guide

## 🎯 Presentation Flow

### Phase 1: CODE (Backend)
1. **apiService.js** - Lines 1-11 → Base configuration
2. **apiService.js** - Lines 14-29 → Query string builder
3. **apiService.js** - Lines 34-48 → `getTokenBalances` function
4. **apiService.js** - Lines 50-67 → `getMultichainBalances` function
5. **apiService.js** - Lines 69-82 → `getERC20Transfers` function

### Phase 2: UI (Frontend)
6. **WalletAPIs.jsx** - Lines 11-23 → First form (Token Balances)
7. **ApiTestForm.jsx** - Lines 19-33 → Form submission logic
8. **ApiTestForm.jsx** - Lines 40-96 → Form rendering
9. **ResponseDisplay.jsx** - Lines 17-32 → Balance formatting
10. **ResponseDisplay.jsx** - Lines 84-154 → Card rendering

### Phase 3: DEMO (Live)
11. Navigate to Wallet API page
12. Fill form and test API
13. Show response in cards
14. Show JSON view
15. Test other endpoints

---

## 📝 Talking Points by File

### `src/api/apiService.js`

**Lines 1-11: Setup**
- "We configure Axios with the base URL"
- "Environment variables for flexibility"

**Lines 14-29: Query Builder**
- "This builds clean query strings"
- "Handles booleans correctly (only true values)"

**Lines 34-48: Token Balances**
- "Path params (chainId, address) vs query params"
- "Endpoint: `/{chainId}/address/{address}/balances_v2/`"
- "Filters out path params from query string"

**Lines 50-67: Multichain**
- "Uses `/allchains/` endpoint"
- "Only supports single address (extracts first)"

**Lines 69-82: Transfers**
- "Similar pattern, different endpoint"
- "Supports pagination"

---

### `src/components/WalletAPIs.jsx`

**Lines 11-23: First Form**
- "Fields define the UI inputs"
- "onSubmit connects to API service"
- "Form data auto-collected"

**Lines 25-36: Multichain Form**
- "Simpler - no chainId needed"
- "Queries all chains by default"

**Lines 38-50: Transfers Form**
- "Includes pagination fields"
- "Optional contract filtering"

---

### `src/components/ApiTestForm.jsx`

**Lines 19-33: Submission**
- "Prevents default form behavior"
- "Sets loading state"
- "Calls onSubmit prop (API function)"
- "Handles errors gracefully"

**Lines 40-96: Rendering**
- "Dynamically renders fields"
- "Handles text, checkbox, select inputs"
- "Submit button disabled when loading"

---

### `src/components/ResponseDisplay.jsx`

**Lines 17-32: Formatting**
- "Converts raw balance using decimals"
- "Example: 1420000000 → 0.142"

**Lines 84-154: Cards**
- "Custom card for token data"
- "Shows logo, name, balance, price, chain"
- "Beautiful visual presentation"

**Lines 255-279: Pagination**
- "5 items per page"
- "Auto-resets on new data"

---

## 🎬 Demo Checklist

- [ ] Navigate to `/wallet` page
- [ ] Show three forms
- [ ] Fill Token Balances form:
  - Chain ID: `1`
  - Address: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
  - Check "No Spam"
- [ ] Click "Test API"
- [ ] Show loading state
- [ ] Show response cards:
  - Point out formatted decimals
  - Show token logos
  - Show USD values
  - Show pagination
- [ ] Switch to JSON view
- [ ] Test Multichain Balances
- [ ] Test ERC20 Transfers

---

## 💡 Key Messages

1. **Separation**: API logic separate from UI
2. **Reusability**: Components used across all APIs
3. **UX**: Loading states, errors, pagination
4. **Data Flow**: Input → State → API → Response → Display
5. **Formatting**: Proper decimal handling for tokens

---

## 🔑 Important Lines to Remember

| Concept | File | Lines |
|---------|------|-------|
| API Setup | apiService.js | 1-11 |
| Query Builder | apiService.js | 14-29 |
| Token Balances | apiService.js | 34-48 |
| Form Submission | ApiTestForm.jsx | 19-33 |
| Balance Formatting | ResponseDisplay.jsx | 17-32 |
| Card Rendering | ResponseDisplay.jsx | 84-154 |

---

## 🎤 Sample Opening

> "Today I'll show you how the Wallet API works in our application. We'll start with the code - how we make API calls - then move to the UI - how users interact with it - and finally see it in action with a live demo."

## 🎤 Sample Closing

> "As you can see, we've built a clean architecture: the API service handles all backend communication, reusable components handle the UI, and everything flows smoothly from user input to beautiful data visualization. The same pattern applies to all our other API categories."


