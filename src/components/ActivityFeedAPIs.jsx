import React from 'react';
import ApiTestForm from './ApiTestForm';
import { apiService } from '../api/apiService';

const ActivityFeedAPIs = ({ apiKey }) => {
  return (
    <div className="api-category">
      <h2>Activity Feed API</h2>
      <p className="api-category-description">Multichain historical transactions with human-readable event logs and historical prices. Includes transaction count and gas usage/spend summaries.</p>
      
      <ApiTestForm
        title="Get Activity Across All Chains for Address"
        description="Get portfolio activity across all supported chains for an address"
        fields={[
          { name: 'address', label: 'Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD', helpText: 'Default: USD' },
          { name: 'chains', label: 'Chains (Optional)', type: 'text', placeholder: 'eth-mainnet,polygon-mainnet', helpText: 'Comma-separated chain names/IDs' },
          { name: 'limit', label: 'Limit', type: 'number', placeholder: '100', helpText: 'Number of items per page' },
        ]}
        onSubmit={(key, data) => apiService.getActivityAcrossChains(key, data.address, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Transaction by Hash"
        description="Retrieve detailed information about a specific transaction"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'txHash', label: 'Transaction Hash', type: 'text', required: true, placeholder: '0x...' },
          { name: 'noLogs', label: 'No Logs', type: 'checkbox', helpText: 'Exclude log events from response' },
        ]}
        onSubmit={(key, data) => apiService.getTransactionByHash(key, data.chainId, data.txHash, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Transaction Summary for Address"
        description="Get a summary of transactions for an address"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'address', label: 'Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
        ]}
        onSubmit={(key, data) => apiService.getTransactionSummary(key, data.chainId, data.address, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Recent Transactions for Address"
        description="Get recent transactions for an address"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'address', label: 'Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
          { name: 'blockHeight', label: 'Block Height (Optional)', type: 'text', placeholder: 'Latest if empty' },
        ]}
        onSubmit={(key, data) => apiService.getRecentTransactions(key, data.chainId, data.address, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Paginated Transactions for Address"
        description="Get paginated transactions for an address"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'address', label: 'Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'pageNumber', label: 'Page Number', type: 'number', required: true, placeholder: '0' },
          { name: 'pageSize', label: 'Page Size', type: 'number', placeholder: '100' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
        ]}
        onSubmit={(key, data) => apiService.getPaginatedTransactions(key, data.chainId, data.address, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Bulk Time Bucket Transactions"
        description="Get transactions grouped by time buckets"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'address', label: 'Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'bucketSize', label: 'Bucket Size', type: 'select', options: [
            { value: 'hour', label: 'Hour' },
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' }
          ], placeholder: 'day' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
        ]}
        onSubmit={(key, data) => apiService.getBulkTimeBucketTransactions(key, data.chainId, data.address, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Multichain & Multiaddress Transactions"
        description="Get transactions across multiple chains and addresses"
        fields={[
          { name: 'addresses', label: 'Addresses', type: 'text', required: true, placeholder: '0x...,0x...', helpText: 'Comma-separated addresses' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
          { name: 'chains', label: 'Chains (Optional)', type: 'text', placeholder: 'eth-mainnet,polygon-mainnet', helpText: 'Comma-separated chain names/IDs' },
          { name: 'limit', label: 'Limit', type: 'number', placeholder: '100' },
        ]}
        onSubmit={(key, data) => apiService.getMultichainTransactions(key, data.addresses, data)}
        apiKey={apiKey}
      />
    </div>
  );
};

export default ActivityFeedAPIs;


