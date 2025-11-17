import React from 'react';
import SecurityAPIs from '../components/SecurityAPIs';
import { useApiKey } from '../context/ApiKeyContext';

const SecurityPage = () => {
  const { apiKey } = useApiKey();

  return (
    <div className="api-page">
      <SecurityAPIs apiKey={apiKey} />
    </div>
  );
};

export default SecurityPage;


