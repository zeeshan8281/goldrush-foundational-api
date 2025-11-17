import React from 'react';
import ApiTestForm from './ApiTestForm';
import { apiService } from '../api/apiService';

const SecurityAPIs = ({ apiKey }) => {
  return (
    <div className="api-category">
      <h2>Security API</h2>
      <p className="api-category-description">NFT and ERC20 token allowances, including value-at-risk.</p>
      
      <ApiTestForm
        title="Get Token Approvals for Address"
        description="Retrieve token approvals for a specific address"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'address', label: 'Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
        ]}
        onSubmit={(key, data) => apiService.getTokenApprovals(key, data.chainId, data.address, data)}
        apiKey={apiKey}
      />
    </div>
  );
};

export default SecurityAPIs;

