import React from 'react';
import PricingUtilityAPIs from '../components/PricingUtilityAPIs';
import { useApiKey } from '../context/ApiKeyContext';

const PricingUtilityPage = () => {
  const { apiKey } = useApiKey();

  return (
    <div className="api-page">
      <PricingUtilityAPIs apiKey={apiKey} />
    </div>
  );
};

export default PricingUtilityPage;


