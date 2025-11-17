import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const apiCategories = [
    { path: '/wallet', name: 'Wallet API', description: 'Multichain token balances, transfers and prices for a wallet', icon: '💰' },
    { path: '/activity-feed', name: 'Activity Feed API', description: 'Multichain historical transactions with event logs and prices', icon: '📊' },
    { path: '/nfts', name: 'NFT API', description: 'Media assets, metadata, sales, owners, and trait filters', icon: '🖼️' },
    { path: '/security', name: 'Security API', description: 'NFT and ERC20 token allowances, including value-at-risk', icon: '🔒' },
    { path: '/block-explorer', name: 'Block Explorer API', description: 'Block details, event logs, gas prices, token prices & holders', icon: '🧱' },
    { path: '/pricing-utility', name: 'Pricing & Utility API', description: 'Token prices (spot and historical), chain info and utilities', icon: '💵' },
  ];

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Welcome to GoldRush API</h1>
        <p className="home-subtitle">Explore and test all available API endpoints</p>
      </div>

      <div className="api-categories-grid">
        {apiCategories.map((category) => (
          <Link key={category.path} to={category.path} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-description">{category.description}</p>
            <span className="category-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

