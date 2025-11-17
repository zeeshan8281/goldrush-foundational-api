import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiKeyContext = createContext();

export const ApiKeyProvider = ({ children }) => {
  const envApiKey = import.meta.env.VITE_API_KEY || '';
  const [apiKey, setApiKey] = useState('');
  const [storedApiKey, setStoredApiKey] = useState('');
  const [keySource, setKeySource] = useState('');

  // Initialize API key on mount
  useEffect(() => {
    const localKey = localStorage.getItem('apiKey');
    if (localKey) {
      setStoredApiKey(localKey);
      setKeySource('localStorage');
    } else if (envApiKey) {
      setStoredApiKey(envApiKey);
      setKeySource('env');
    }
  }, [envApiKey]);

  const handleSetApiKey = (newKey) => {
    if (newKey.trim()) {
      setStoredApiKey(newKey);
      localStorage.setItem('apiKey', newKey);
      setKeySource('localStorage');
      return true;
    }
    return false;
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('apiKey');
    setStoredApiKey(envApiKey || '');
    setKeySource(envApiKey ? 'env' : '');
  };

  return (
    <ApiKeyContext.Provider
      value={{
        apiKey: storedApiKey,
        keySource,
        setApiKey: handleSetApiKey,
        clearApiKey: handleClearApiKey,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within ApiKeyProvider');
  }
  return context;
};


