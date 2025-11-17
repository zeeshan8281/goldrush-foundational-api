import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.covalenthq.com/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to build query string
const buildQueryString = (params) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      // Convert boolean to string, skip false values for checkboxes
      if (typeof value === 'boolean') {
        if (value) {
          queryParams.append(key, 'true');
        }
      } else {
        queryParams.append(key, String(value));
      }
    }
  });
  return queryParams.toString();
};

// API Service Functions
export const apiService = {
  // ========== BALANCES ==========
  getTokenBalances: async (apiKey, chainId, address, params = {}) => {
    // Filter out path parameters and only include query parameters
    const { chainId: _, address: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'nft': queryParams.nft || false,
      'no-nft-fetch': queryParams.noNftFetch || false,
      'no-spam': queryParams.noSpam || false,
      'no-nft-asset-metadata': queryParams.noNftAssetMetadata || false,
    });
    const response = await api.get(
      `/${chainId}/address/${address}/balances_v2/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getMultichainBalances: async (apiKey, addresses, params = {}) => {
    // Filter out addresses parameter - note: this endpoint only supports single address
    const { addresses: _, ...queryParams } = params;
    // Get first address if multiple provided (API only supports one address per call)
    const address = addresses.split(',')[0].trim();
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'chains': queryParams.chains || '', // Optional: comma-separated chain names/IDs
      'limit': queryParams.limit || 100,
      'before': queryParams.before || '',
      'cutoff-timestamp': queryParams.cutoffTimestamp || '',
    });
    // Correct endpoint: /v1/allchains/address/{walletAddress}/balances/
    const response = await api.get(
      `/allchains/address/${address}/balances/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  // ========== TRANSFERS ==========
  getERC20Transfers: async (apiKey, chainId, address, params = {}) => {
    // Filter out path parameters
    const { chainId: _, address: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'contract-address': queryParams.contractAddress || '',
      'page-size': queryParams.pageSize || 100,
      'page-number': queryParams.pageNumber || 0,
    });
    const response = await api.get(
      `/${chainId}/address/${address}/transfers_v2/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  // ========== ACTIVITY ==========
  getActivityAcrossChains: async (apiKey, address, params = {}) => {
    // Filter out path parameters
    const { address: _, ...queryParams } = params;
    // Use multichain balances endpoint for activity (portfolio endpoint doesn't exist in v1)
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'chains': queryParams.chains || '',
      'limit': queryParams.limit || 100,
    });
    // Use allchains balances endpoint for portfolio activity
    const response = await api.get(
      `/allchains/address/${address}/balances/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  // ========== TRANSACTIONS ==========
  getTransactionByHash: async (apiKey, chainId, txHash, params = {}) => {
    // Filter out path parameters
    const { chainId: _, txHash: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'no-logs': queryParams.noLogs || false,
    });
    const response = await api.get(
      `/${chainId}/transaction_v2/${txHash}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getTransactionSummary: async (apiKey, chainId, address, params = {}) => {
    // Filter out path parameters
    const { chainId: _, address: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
    });
    const response = await api.get(
      `/${chainId}/address/${address}/transactions_summary/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getRecentTransactions: async (apiKey, chainId, address, params = {}) => {
    // Filter out path parameters
    const { chainId: _, address: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'block-height': queryParams.blockHeight || '',
    });
    const response = await api.get(
      `/${chainId}/address/${address}/transactions_v3/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getPaginatedTransactions: async (apiKey, chainId, address, params = {}) => {
    // Filter out path parameters
    const { chainId: _, address: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'block-height': queryParams.blockHeight || '',
      'page-size': queryParams.pageSize || 100,
      'page-number': queryParams.pageNumber || 0,
    });
    const response = await api.get(
      `/${chainId}/address/${address}/transactions_v3/page/${queryParams.pageNumber || 0}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getBulkTransactions: async (apiKey, chainId, address, params = {}) => {
    // Filter out path parameters
    const { chainId: _, address: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'block-height': queryParams.blockHeight || '',
      'page-size': queryParams.pageSize || 100,
      'page-number': queryParams.pageNumber || 0,
    });
    const response = await api.get(
      `/${chainId}/address/${address}/transactions_v3/page/${queryParams.pageNumber || 0}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getBulkTimeBucketTransactions: async (apiKey, chainId, address, params = {}) => {
    // Filter out path parameters
    const { chainId: _, address: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'bucket-size': queryParams.bucketSize || 'day',
    });
    const response = await api.get(
      `/${chainId}/address/${address}/transactions_v3/buckets/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getMultichainTransactions: async (apiKey, addresses, params = {}) => {
    // Filter out addresses parameter
    const { addresses: _, ...queryParams } = params;
    const queryString = buildQueryString({
      'addresses': addresses, // Comma-separated addresses in query params
      'chains': queryParams.chains || '', // Optional: comma-separated chain names/IDs
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'limit': queryParams.limit || 100,
      'before': queryParams.before || '',
      'after': queryParams.after || '',
      'with-logs': queryParams.withLogs || false,
      'with-decoded-logs': queryParams.withDecodedLogs || false,
      'with-internal': queryParams.withInternal || false,
      'with-state': queryParams.withState || false,
      'with-input-data': queryParams.withInputData || false,
    });
    // Correct endpoint: /v1/allchains/transactions/
    const response = await api.get(
      `/allchains/transactions/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  // ========== BLOCKS ==========
  getBlockByHeight: async (apiKey, chainId, blockHeight, params = {}) => {
    // Filter out path parameters
    const { chainId: _, blockHeight: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
    });
    const response = await api.get(
      `/${chainId}/block_v2/${blockHeight}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getTransactionsInBlockByPage: async (apiKey, chainId, blockHeight, params = {}) => {
    // Filter out path parameters
    const { chainId: _, blockHeight: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'page-size': queryParams.pageSize || 100,
      'page-number': queryParams.pageNumber || 0,
    });
    const response = await api.get(
      `/${chainId}/block_v2/${blockHeight}/transactions_v2/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getTransactionsInBlockByHash: async (apiKey, chainId, blockHash, params = {}) => {
    // Filter out path parameters
    const { chainId: _, blockHash: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
      'page-size': queryParams.pageSize || 100,
      'page-number': queryParams.pageNumber || 0,
    });
    const response = await api.get(
      `/${chainId}/block_v2/${blockHash}/transactions_v2/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  // ========== NFTS ==========
  getNFT: async (apiKey, chainId, tokenId, contractAddress, params = {}) => {
    // Filter out path parameters
    const { chainId: _, tokenId: __, contractAddress: ___, ...queryParams } = params;
    const queryString = buildQueryString({
      'no-spam': queryParams.noSpam || false,
    });
    const response = await api.get(
      `/${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  requestCollectionCache: async (apiKey, chainId, contractAddress) => {
    const response = await api.post(
      `/${chainId}/tokens/${contractAddress}/nft_collection_cache/?key=${apiKey}`
    );
    return response.data;
  },

  getCollectionCacheStatus: async (apiKey, chainId, contractAddress) => {
    const response = await api.get(
      `/${chainId}/tokens/${contractAddress}/nft_collection_cache/?key=${apiKey}`
    );
    return response.data;
  },

  // ========== SECURITY ==========
  getTokenApprovals: async (apiKey, chainId, address, params = {}) => {
    // Filter out path parameters
    const { chainId: _, address: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
    });
    const response = await api.get(
      `/${chainId}/approvals/${address}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  // ========== PRICING ==========
  getHistoricalTokenPrices: async (apiKey, chainId, ticker, params = {}) => {
    // Filter out path parameters
    const { chainId: _, ticker: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'from': queryParams.from || '',
      'to': queryParams.to || '',
      'quote-currency': queryParams.quoteCurrency || 'USD',
    });
    const response = await api.get(
      `/${chainId}/pricing/historical/${ticker}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getPoolSpotPrices: async (apiKey, chainId, ticker, params = {}) => {
    // Filter out path parameters
    const { chainId: _, ticker: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'quote-currency': queryParams.quoteCurrency || 'USD',
    });
    const response = await api.get(
      `/${chainId}/pricing/tickers/${ticker}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  // ========== EVENTS/LOGS ==========
  getLogs: async (apiKey, chainId, address, params = {}) => {
    // Filter out path parameters
    const { chainId: _, address: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'starting-block': queryParams.startingBlock || '',
      'ending-block': queryParams.endingBlock || '',
      'page-size': queryParams.pageSize || 100,
      'page-number': queryParams.pageNumber || 0,
    });
    const response = await api.get(
      `/${chainId}/events/address/${address}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getLogEventsByContract: async (apiKey, chainId, contractAddress, params = {}) => {
    // Filter out path parameters
    const { chainId: _, contractAddress: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'starting-block': queryParams.startingBlock || '',
      'ending-block': queryParams.endingBlock || '',
      'page-size': queryParams.pageSize || 100,
      'page-number': queryParams.pageNumber || 0,
    });
    const response = await api.get(
      `/${chainId}/events/topics/${contractAddress}/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  getTokenHolders: async (apiKey, chainId, contractAddress, params = {}) => {
    // Filter out path parameters
    const { chainId: _, contractAddress: __, ...queryParams } = params;
    const queryString = buildQueryString({
      'block-height': queryParams.blockHeight || '',
      'page-size': queryParams.pageSize || 100,
      'page-number': queryParams.pageNumber || 0,
    });
    const response = await api.get(
      `/${chainId}/tokens/${contractAddress}/token_holders/?key=${apiKey}&${queryString}`
    );
    return response.data;
  },

  // ========== UTILITY ==========
  getAllChains: async (apiKey) => {
    const response = await api.get(`/chains/?key=${apiKey}`);
    return response.data;
  },

  getAllChainStatuses: async (apiKey) => {
    const response = await api.get(`/chains/status/?key=${apiKey}`);
    return response.data;
  },

  getResolvedAddress: async (apiKey, chainId, address) => {
    const response = await api.get(
      `/${chainId}/address/${address}/resolve_address/?key=${apiKey}`
    );
    return response.data;
  },
};

