import React from 'react';
import ApiTestForm from './ApiTestForm';
import { apiService } from '../api/apiService';

const BlockExplorerAPIs = ({ apiKey }) => {
  return (
    <div className="api-category">
      <h2>Block Explorer API</h2>
      <p className="api-category-description">Block details, event logs by contract address or topic hash, gas prices, token prices & holders.</p>
      
      <ApiTestForm
        title="Get Block by Height"
        description="Retrieve block information by block height"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'blockHeight', label: 'Block Height', type: 'text', required: true, placeholder: 'e.g., 18500000' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
        ]}
        onSubmit={(key, data) => apiService.getBlockByHeight(key, data.chainId, data.blockHeight, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get All Transactions in a Block by Page"
        description="Get paginated transactions in a block by block height"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'blockHeight', label: 'Block Height', type: 'text', required: true, placeholder: 'e.g., 18500000' },
          { name: 'pageNumber', label: 'Page Number', type: 'number', placeholder: '0' },
          { name: 'pageSize', label: 'Page Size', type: 'number', placeholder: '100' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
        ]}
        onSubmit={(key, data) => apiService.getTransactionsInBlockByPage(key, data.chainId, data.blockHeight, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get All Transactions in a Block by Hash"
        description="Get paginated transactions in a block by block hash"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'blockHash', label: 'Block Hash', type: 'text', required: true, placeholder: '0x...' },
          { name: 'pageNumber', label: 'Page Number', type: 'number', placeholder: '0' },
          { name: 'pageSize', label: 'Page Size', type: 'number', placeholder: '100' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
        ]}
        onSubmit={(key, data) => apiService.getTransactionsInBlockByHash(key, data.chainId, data.blockHash, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Logs"
        description="Retrieve event logs for an address"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'address', label: 'Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'startingBlock', label: 'Starting Block', type: 'text', placeholder: 'e.g., 18500000' },
          { name: 'endingBlock', label: 'Ending Block', type: 'text', placeholder: 'e.g., 18501000' },
          { name: 'pageNumber', label: 'Page Number', type: 'number', placeholder: '0' },
          { name: 'pageSize', label: 'Page Size', type: 'number', placeholder: '100' },
        ]}
        onSubmit={(key, data) => apiService.getLogs(key, data.chainId, data.address, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Log Events by Contract Address"
        description="Get event logs filtered by contract address"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'contractAddress', label: 'Contract Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'startingBlock', label: 'Starting Block', type: 'text', placeholder: 'e.g., 18500000' },
          { name: 'endingBlock', label: 'Ending Block', type: 'text', placeholder: 'e.g., 18501000' },
          { name: 'pageNumber', label: 'Page Number', type: 'number', placeholder: '0' },
          { name: 'pageSize', label: 'Page Size', type: 'number', placeholder: '100' },
        ]}
        onSubmit={(key, data) => apiService.getLogEventsByContract(key, data.chainId, data.contractAddress, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Token Holders as of Block Height"
        description="Get list of token holders at a specific block height"
        fields={[
          { name: 'chainId', label: 'Chain ID', type: 'text', required: true, placeholder: 'e.g., 1 (Ethereum)' },
          { name: 'contractAddress', label: 'Contract Address', type: 'text', required: true, placeholder: '0x...' },
          { name: 'blockHeight', label: 'Block Height', type: 'text', placeholder: 'e.g., 18500000', helpText: 'Leave empty for latest' },
          { name: 'pageNumber', label: 'Page Number', type: 'number', placeholder: '0' },
          { name: 'pageSize', label: 'Page Size', type: 'number', placeholder: '100' },
        ]}
        onSubmit={(key, data) => apiService.getTokenHolders(key, data.chainId, data.contractAddress, data)}
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
    </div>
  );
};

export default BlockExplorerAPIs;


