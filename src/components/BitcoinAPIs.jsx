import React from 'react';
import ApiTestForm from './ApiTestForm';
import { apiService } from '../api/apiService';

const BitcoinAPIs = ({ apiKey }) => {
  return (
    <div className="api-category">
      <h2>Bitcoin API</h2>
      <p className="api-category-description">Bitcoin balances and transactions for x/y/zpub and non-HD addresses, including historical and spot prices.</p>
      
      <ApiTestForm
        title="Get Bitcoin Balances"
        description="Retrieve Bitcoin balances for xpub, ypub, zpub, or regular Bitcoin addresses"
        fields={[
          { name: 'address', label: 'Address (xpub/ypub/zpub or regular)', type: 'text', required: true, placeholder: 'xpub... or 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', helpText: 'Supports HD wallet addresses (xpub/ypub/zpub) or regular Bitcoin addresses' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD', helpText: 'Default: USD' },
          { name: 'noSpam', label: 'No Spam', type: 'checkbox', helpText: 'Exclude spam tokens' },
        ]}
        onSubmit={(key, data) => apiService.getBitcoinBalances(key, data.address, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Bitcoin Transactions"
        description="Retrieve transaction history for a Bitcoin address"
        fields={[
          { name: 'address', label: 'Address (xpub/ypub/zpub or regular)', type: 'text', required: true, placeholder: 'xpub... or 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
          { name: 'quoteCurrency', label: 'Quote Currency', type: 'text', placeholder: 'USD' },
          { name: 'pageSize', label: 'Page Size', type: 'number', placeholder: '100', helpText: 'Default: 100' },
          { name: 'pageNumber', label: 'Page Number', type: 'number', placeholder: '0', helpText: 'Default: 0' },
        ]}
        onSubmit={(key, data) => apiService.getBitcoinTransactions(key, data.address, data)}
        apiKey={apiKey}
      />

      <ApiTestForm
        title="Get Bitcoin Transaction by Hash"
        description="Retrieve detailed information about a specific Bitcoin transaction"
        fields={[
          { name: 'txHash', label: 'Transaction Hash', type: 'text', required: true, placeholder: 'Bitcoin transaction hash' },
          { name: 'noLogs', label: 'No Logs', type: 'checkbox', helpText: 'Exclude log events from response' },
        ]}
        onSubmit={(key, data) => apiService.getBitcoinTransactionByHash(key, data.txHash, data)}
        apiKey={apiKey}
      />
    </div>
  );
};

export default BitcoinAPIs;

