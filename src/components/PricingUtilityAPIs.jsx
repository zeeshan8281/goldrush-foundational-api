import React from 'react';
import ApiTestForm from './ApiTestForm';
import { apiService } from '../api/apiService';

const PricingUtilityAPIs = ({ apiKey }) => {
  return (
    <div className="api-category">
      <h2>Pricing & Utility API</h2>
      <p className="api-category-description">Token prices (spot and historical), chain information, and utility endpoints.</p>
      
      <ApiTestForm
        title="Get Historical Token Prices"
        description="Retrieve historical price data for a token"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'ticker', label: 'Ticker Symbol', type: 'text', required: true, placeholder: 'e.g., ETH' },
          { name: 'from', label: 'From Date (Optional)', type: 'date', helpText: 'Start date for historical data' },
          { name: 'to', label: 'To Date (Optional)', type: 'date', helpText: 'End date for historical data' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
        ]}
        onSubmit={(key, data) => apiService.getHistoricalTokenPrices(key, data.chainId, data.ticker, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Pool Spot Prices"
        description="Get current spot prices from DEX pools"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'ticker', label: 'Ticker Symbol', type: 'text', required: true, placeholder: 'e.g., ETH' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
        ]}
        onSubmit={(key, data) => apiService.getPoolSpotPrices(key, data.chainId, data.ticker, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get All Chains"
        description="Retrieve list of all supported chains"
        fields={[]}
        onSubmit={(key) => apiService.getAllChains(key)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get All Chain Statuses"
        description="Get status information for all chains"
        fields={[]}
        onSubmit={(key) => apiService.getAllChainStatuses(key)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Resolved Address for Registered Address"
        description="Resolve an ENS or other registered address to its canonical address"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'address', label: 'Address or ENS', type: 'text', required: true, placeholder: '0x... or example.eth' },
        ]}
        onSubmit={(key, data) => apiService.getResolvedAddress(key, data.chainId, data.address)}
        apiKey={apiKey}
      />
    </div>
  );
};

export default PricingUtilityAPIs;


