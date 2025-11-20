import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useApiKey } from '../context/ApiKeyContext';

const Layout = () => {
  const location = useLocation();
  const { apiKey, keySource, setApiKey, clearApiKey } = useApiKey();
  const [apiKeyInput, setApiKeyInput] = useState('');

  const handleSetApiKey = () => {
    if (setApiKey(apiKeyInput)) {
      setApiKeyInput('');
      alert('API Key saved to browser storage!');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/wallet', label: 'Wallet API', icon: '💰' },
    { path: '/activity-feed', label: 'Activity Feed API', icon: '📊' },
    { path: '/nfts', label: 'NFT API', icon: '🖼️' },
    { path: '/bitcoin', label: 'Bitcoin API', icon: '₿' },
    { path: '/security', label: 'Security API', icon: '🔒' },
    { path: '/block-explorer', label: 'Block Explorer API', icon: '🧱' },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="header-title-link">
            <h1>GoldRush Foundational API UI</h1>
          </Link>
          <p className="subtitle">Test and explore all GoldRush API endpoints</p>
        </div>
        <div className="api-key-section">
          <input
            type="password"
            placeholder="Enter your API Key"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            className="api-key-input"
          />
          <button onClick={handleSetApiKey} className="set-key-btn">
            Set API Key
          </button>
          {apiKey && (
            <>
              <span className="key-status">
                ✓ Key Set ({keySource === 'env' ? 'from .env' : 'from browser'})
              </span>
              <button onClick={clearApiKey} className="clear-key-btn" title="Clear API Key">
                Clear
              </button>
            </>
          )}
        </div>
      </header>

      <div className="main-content">
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="page-content">
          {!apiKey && location.pathname !== '/' ? (
            <div className="no-api-key-message">
              <h2>Please set your API Key</h2>
              <p>Enter your GoldRush API key in the header to start testing endpoints.</p>
              <p>Get your API key from <a href="https://www.covalenthq.com/" target="_blank" rel="noopener noreferrer">Covalent</a></p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;

