import React, { useState, useMemo, useEffect } from 'react';

const ResponseDisplay = ({ response }) => {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'json'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatNumber = (num) => {
    if (!num && num !== 0) return 'N/A';
    if (typeof num === 'string') return num;
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const formatTokenBalance = (balance, decimals) => {
    if (!balance && balance !== 0) return 'N/A';
    if (decimals === undefined || decimals === null) {
      // If no decimals provided, try to format as regular number
      return formatNumber(Number(balance));
    }
    
    const divisor = Math.pow(10, decimals);
    const formattedBalance = Number(balance) / divisor;
    
    // Format with appropriate decimal places
    return formattedBalance.toLocaleString(undefined, {
      maximumFractionDigits: Math.min(decimals, 18),
      minimumFractionDigits: 0
    });
  };

  const formatCurrency = (amount, currency = 'USD') => {
    if (!amount && amount !== 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);
  };

  const truncateAddress = (address) => {
    if (!address) return 'N/A';
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const renderValue = (key, value) => {
    if (value === null || value === undefined) return <span className="value-null">N/A</span>;
    
    if (typeof value === 'boolean') {
      return <span className={`value-badge ${value ? 'value-true' : 'value-false'}`}>{value ? 'Yes' : 'No'}</span>;
    }
    
    if (typeof value === 'number') {
      if (key.toLowerCase().includes('price') || key.toLowerCase().includes('quote') || key.toLowerCase().includes('value')) {
        return <span className="value-number">{formatCurrency(value)}</span>;
      }
      return <span className="value-number">{formatNumber(value)}</span>;
    }
    
    if (typeof value === 'string') {
      if (value.startsWith('0x') && value.length === 42) {
        return <span className="value-address" title={value}>{truncateAddress(value)}</span>;
      }
      if (value.length > 50) {
        return <span className="value-text" title={value}>{value.slice(0, 50)}...</span>;
      }
    }
    
    if (Array.isArray(value)) {
      return <span className="value-array">{value.length} items</span>;
    }
    
    if (typeof value === 'object') {
      return <span className="value-object">Object ({Object.keys(value).length} keys)</span>;
    }
    
    return <span className="value-text">{String(value)}</span>;
  };

  const renderCard = (item, index) => {
    if (!item || typeof item !== 'object') return null;

    // Special handling for token balance items
    if (item.contract_name || item.contract_ticker_symbol) {
      // Handle both single logo_url and logo_urls object
      const logoUrl = item.logo_urls?.token_logo_url || item.contract_logo_url;
      const chainLogoUrl = item.logo_urls?.chain_logo_url;
      
      return (
        <div key={index} className="response-card token-card">
          <div className="card-header">
            <div className="card-title-section">
              {logoUrl && (
                <img src={logoUrl} alt={item.contract_ticker_symbol} className="token-logo" onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <div>
                <h4 className="card-title">{item.contract_display_name || item.contract_name || 'Unknown Token'}</h4>
                <p className="card-subtitle">{item.contract_ticker_symbol || 'N/A'}</p>
                {item.chain_name && (
                  <p className="card-chain">{item.chain_display_name || item.chain_name}</p>
                )}
              </div>
            </div>
            {item.quote !== null && item.quote !== undefined && (
              <div className="card-value">
                <span className="value-large">{formatCurrency(item.quote, item.quote_currency || 'USD')}</span>
              </div>
            )}
          </div>
          <div className="card-body">
            <div className="card-row">
              <span className="card-label">Balance:</span>
              <span className="card-value-text">{formatTokenBalance(item.balance, item.contract_decimals)} {item.contract_ticker_symbol}</span>
            </div>
            {item.quote_rate !== null && item.quote_rate !== undefined && (
              <div className="card-row">
                <span className="card-label">Price:</span>
                <span className="card-value-text">{formatCurrency(item.quote_rate, item.quote_currency || 'USD')}</span>
              </div>
            )}
            {item.chain_name && (
              <div className="card-row">
                <span className="card-label">Chain:</span>
                <span className="card-value-text">{item.chain_display_name || item.chain_name} ({item.chain_id})</span>
              </div>
            )}
            {item.contract_address && (
              <div className="card-row">
                <span className="card-label">Contract:</span>
                <span className="card-value-text value-address" title={item.contract_address}>
                  {truncateAddress(item.contract_address)}
                </span>
              </div>
            )}
            {item.type && (
              <div className="card-row">
                <span className="card-label">Type:</span>
                <span className="card-value-text">{item.type}</span>
              </div>
            )}
            {item.is_native_token !== undefined && (
              <div className="card-row">
                <span className="card-label">Native Token:</span>
                <span className="card-value-text">{item.is_native_token ? 'Yes' : 'No'}</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Special handling for transaction items
    if (item.tx_hash || item.block_signed_at) {
      return (
        <div key={index} className="response-card transaction-card">
          <div className="card-header">
            <h4 className="card-title">Transaction</h4>
            {item.tx_hash && (
              <span className="card-badge" title={item.tx_hash}>{truncateAddress(item.tx_hash)}</span>
            )}
          </div>
          <div className="card-body">
            {item.block_signed_at && (
              <div className="card-row">
                <span className="card-label">Date:</span>
                <span className="card-value-text">{new Date(item.block_signed_at).toLocaleString()}</span>
              </div>
            )}
            {item.from_address && (
              <div className="card-row">
                <span className="card-label">From:</span>
                <span className="card-value-text value-address" title={item.from_address}>
                  {truncateAddress(item.from_address)}
                </span>
              </div>
            )}
            {item.to_address && (
              <div className="card-row">
                <span className="card-label">To:</span>
                <span className="card-value-text value-address" title={item.to_address}>
                  {truncateAddress(item.to_address)}
                </span>
              </div>
            )}
            {item.value && (
              <div className="card-row">
                <span className="card-label">Value:</span>
                <span className="card-value-text">{formatNumber(item.value)}</span>
              </div>
            )}
            {item.gas_offered && (
              <div className="card-row">
                <span className="card-label">Gas:</span>
                <span className="card-value-text">{formatNumber(item.gas_offered)}</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Generic card for other objects
    return (
      <div key={index} className="response-card generic-card">
        <div className="card-header">
          <h4 className="card-title">Item {index + 1}</h4>
        </div>
        <div className="card-body">
          {Object.entries(item).slice(0, 8).map(([key, value]) => (
            <div key={key} className="card-row">
              <span className="card-label">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
              <span className="card-value-text">{renderValue(key, value)}</span>
            </div>
          ))}
          {Object.keys(item).length > 8 && (
            <div className="card-row">
              <span className="card-label">...</span>
              <span className="card-value-text">{Object.keys(item).length - 8} more fields</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getDataItems = () => {
    if (!response) return [];
    
    // Common response structures
    if (response.data?.items && Array.isArray(response.data.items)) {
      return response.data.items;
    }
    if (response.items && Array.isArray(response.items)) {
      return response.items;
    }
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
    if (Array.isArray(response)) {
      return response;
    }
    
    // If it's a single object, wrap it in an array
    if (typeof response === 'object') {
      return [response];
    }
    
    return [];
  };

  const items = getDataItems();
  const hasItems = items.length > 0;

  // Pagination logic
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex]);

  // Reset to page 1 when items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="response-display-container">
      <div className="response-header">
        <h4>Response</h4>
        <div className="view-mode-toggle">
          <button
            className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
            disabled={!hasItems}
          >
            Cards
          </button>
          <button
            className={`view-btn ${viewMode === 'json' ? 'active' : ''}`}
            onClick={() => setViewMode('json')}
          >
            JSON
          </button>
        </div>
      </div>

      {viewMode === 'cards' && hasItems && (
        <>
          <div className="response-cards-grid">
            {paginatedItems.map((item, index) => renderCard(item, startIndex + index))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {startIndex + 1}-{Math.min(endIndex, items.length)} of {items.length} items
              </div>
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          className={`pagination-page-btn ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="pagination-ellipsis">...</span>;
                    }
                    return null;
                  })}
                </div>
                
                <button
                  className="pagination-btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {viewMode === 'cards' && !hasItems && (
        <div className="response-info-card">
          <p>No items found in response</p>
          <p className="info-text">Switch to JSON view to see the full response structure</p>
        </div>
      )}

      {viewMode === 'json' && (
        <pre className="response-content">{JSON.stringify(response, null, 2)}</pre>
      )}

      {hasItems && viewMode === 'cards' && totalPages <= 1 && (
        <div className="response-footer">
          <span className="items-count">Showing {items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;

