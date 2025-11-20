import React from 'react';
import BitcoinAPIs from '../components/BitcoinAPIs';
import { useApiKey } from '../context/ApiKeyContext';

const BitcoinPage = () => {
  const { apiKey } = useApiKey();

  return (
    <div className="api-page">
      <BitcoinAPIs apiKey={apiKey} />
    </div>
  );
};

export default BitcoinPage;

