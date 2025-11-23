import React, { createContext, useState, useEffect, useContext } from 'react';

const ApiKeyContext = createContext();

export const useApiKey = () => useContext(ApiKeyContext);

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKeyState] = useState(() => {
    return localStorage.getItem('alphavantage_api_key') || '';
  });

  const setApiKey = (key) => {
    setApiKeyState(key);
    if (key) {
      localStorage.setItem('alphavantage_api_key', key);
    } else {
      localStorage.removeItem('alphavantage_api_key');
    }
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
