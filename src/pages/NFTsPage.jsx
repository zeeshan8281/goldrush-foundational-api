import React from 'react';
import NFTAPIs from '../components/NFTAPIs';
import { useApiKey } from '../context/ApiKeyContext';

const NFTsPage = () => {
  const { apiKey } = useApiKey();

  return (
    <div className="api-page">
      <NFTAPIs apiKey={apiKey} />
    </div>
  );
};

export default NFTsPage;


