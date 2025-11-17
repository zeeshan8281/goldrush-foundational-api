import React from 'react';
import ApiTestForm from './ApiTestForm';
import { apiService } from '../api/apiService';

const WalletAPIs = ({ apiKey }) => {
  return (
    <div className="api-category">
      <h2>Wallet API</h2>
      <p className="api-category-description">Multichain token balances (ERC20, 721, 1155, native), token transfers and prices for a wallet.</p>
      
      <ApiTestForm
        title="Get Token Balances for Address"
        description="Retrieve token balances for a specific address on a chain"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)', helpText: 'Chain ID number (1=Ethereum, 137=Polygon, etc.)' },
          { name: 'address', label: 'Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD', helpText: 'Default: USD' },
          { name: 'nft', label: 'Include NFTs', type: 'checkbox', helpText: 'Include NFT data in response' },
          { name: 'noSpam', label: 'No Spam', type: 'checkbox', helpText: 'Exclude spam tokens' },
        ]}
        onSubmit={(key, data) => apiService.getTokenBalances(key, data.chainId, data.address, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Multichain Balances"
        description="Get balances for a single address across multiple chains (up to 10 EVM chains). Note: Only the first address will be used if multiple are provided."
        fields={[
          { name: 'addresses', label: 'Address', type: 'text', required: true, placeholder: '0x...', helpText: 'Single address (API supports one address per call)' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD', helpText: 'Default: USD' },
          { name: 'chains', label: 'Chains (Optional)', type: 'text', placeholder: 'eth-mainnet,polygon-mainnet', helpText: 'Comma-separated chain names/IDs. Defaults to all foundational chains.' },
          { name: 'limit', label: 'Limit', type: 'number', placeholder: '100', helpText: 'Number of items per page (max 100)' },
        ]}
        onSubmit={(key, data) => apiService.getMultichainBalances(key, data.addresses, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get ERC20 Token Transfers for Address"
        description="Retrieve ERC20 token transfers for a specific address"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'address', label: 'Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'contractAddress', label: 'Contract Address (Optional)', type: 'text', placeholder: '0x...', helpText: 'Filter by specific token contract' },
          { name: 'pageSize', label: 'Page Size', type: 'number', placeholder: '100', helpText: 'Default: 100' },
          { name: 'pageNumber', label: 'Page Number', type: 'number', placeholder: '0', helpText: 'Default: 0' },
        ]}
        onSubmit={(key, data) => apiService.getERC20Transfers(key, data.chainId, data.address, data)}
        apiKey={apiKey}
      />
    </div>
  );
};

export default WalletAPIs;


