import React from 'react';
import ActivityFeedAPIs from '../components/ActivityFeedAPIs';
import { useApiKey } from '../context/ApiKeyContext';

const ActivityFeedPage = () => {
  const { apiKey } = useApiKey();

  return (
    <div className="api-page">
      <ActivityFeedAPIs apiKey={apiKey} />
    </div>
  );
};

export default ActivityFeedPage;


