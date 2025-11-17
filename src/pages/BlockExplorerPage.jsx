import React from 'react';
import BlockExplorerAPIs from '../components/BlockExplorerAPIs';
import { useApiKey } from '../context/ApiKeyContext';

const BlockExplorerPage = () => {
  const { apiKey } = useApiKey();

  return (
    <div className="api-page">
      <BlockExplorerAPIs apiKey={apiKey} />
    </div>
  );
};

export default BlockExplorerPage;


