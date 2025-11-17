import React from 'react';
import ApiTestForm from './ApiTestForm';
import { apiService } from '../api/apiService';

const NFTAPIs = ({ apiKey }) => {
  return (
    <div className="api-category">
      <h2>NFT API</h2>
      <p className="api-category-description">Media assets, metadata, sales, owners, trait and attribute filters, thumbnail previews.</p>
      
      <ApiTestForm
        title="Get NFT"
        description="Retrieve NFT metadata for a specific token"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'contractAddress', label: 'Contract Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'tokenId', label: 'Token ID', type: 'text', required: true, placeholder: 'e.g., 123' },
          { name: 'noSpam', label: 'No Spam', type: 'checkbox', helpText: 'Exclude spam NFTs' },
        ]}
        onSubmit={(key, data) => apiService.getNFT(key, data.chainId, data.tokenId, data.contractAddress, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Request Collection Cache"
        description="Request caching for an NFT collection"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'contractAddress', label: 'Contract Address', type: 'text', required: true, placeholder: '0x...' },
        ]}
        onSubmit={(key, data) => apiService.requestCollectionCache(key, data.chainId, data.contractAddress)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Collection Cache Status"
        description="Check the status of an NFT collection cache"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'contractAddress', label: 'Contract Address', type: 'text', required: true, placeholder: '0x...' },
        ]}
        onSubmit={(key, data) => apiService.getCollectionCacheStatus(key, data.chainId, data.contractAddress)}
        apiKey={apiKey}
      />
    </div>
  );
};

export default NFTAPIs;

