import React from 'react';
import WalletAPIs from '../components/WalletAPIs';
import { useApiKey } from '../context/ApiKeyContext';

const WalletPage = () => {
  const { apiKey } = useApiKey();

  return (
    <div className="api-page">
      <WalletAPIs apiKey={apiKey} />
    </div>
  );
};

export default WalletPage;


