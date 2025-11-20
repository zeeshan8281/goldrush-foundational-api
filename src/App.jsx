import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WalletPage from './pages/WalletPage';
import ActivityFeedPage from './pages/ActivityFeedPage';
import NFTsPage from './pages/NFTsPage';
import SecurityPage from './pages/SecurityPage';
import BlockExplorerPage from './pages/BlockExplorerPage';
import BitcoinPage from './pages/BitcoinPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="wallet" element={<WalletPage />} />
        <Route path="activity-feed" element={<ActivityFeedPage />} />
        <Route path="nfts" element={<NFTsPage />} />
        <Route path="bitcoin" element={<BitcoinPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="block-explorer" element={<BlockExplorerPage />} />
        {/* Catch-all route: redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
