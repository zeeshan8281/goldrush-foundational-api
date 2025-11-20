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

  const isUrl = (str) => {
    if (typeof str !== 'string') return false;
    try {
      const url = new URL(str);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      // Check if it looks like a URL even if URL constructor fails
      return /^https?:\/\/.+/.test(str);
    }
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
      // Check if it's a URL first
      if (isUrl(value)) {
        return (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="value-link"
            style={{
              color: 'var(--accent-cyan)',
              textDecoration: 'underline',
              wordBreak: 'break-all',
              fontSize: '0.9rem'
            }}
            title={value}
          >
            {value.length > 60 ? `${value.slice(0, 60)}...` : value}
          </a>
        );
      }
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

  const renderAllFields = (obj, prefix = '') => {
    const fields = [];
    const skipFields = ['error', 'error_message', 'error_code', 'error_data']; // Skip error fields
    
    const processValue = (key, value, fullKey) => {
      if (skipFields.includes(key.toLowerCase())) return null;
      
      if (value === null || value === undefined) {
        return (
          <div key={fullKey} className="card-row">
            <span className="card-label">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
            <span className="card-value-text value-null">null</span>
          </div>
        );
      }
      
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return (
            <div key={fullKey} className="card-row">
              <span className="card-label">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
              <span className="card-value-text value-array">[] (empty array)</span>
            </div>
          );
        }
        // For arrays, show count and ALL items (or first 10 for very large arrays)
        const maxItems = value.length > 10 ? 10 : value.length;
        return (
          <div key={fullKey} className="card-row">
            <span className="card-label">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
            <div style={{display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px'}}>
              <span className="card-value-text value-array" style={{fontWeight: '600', marginBottom: '4px'}}>
                {value.length} item{value.length !== 1 ? 's' : ''}
              </span>
              {value.slice(0, maxItems).map((arrItem, idx) => {
                if (typeof arrItem === 'object' && arrItem !== null) {
                  return (
                    <div key={idx} style={{marginLeft: '16px', padding: '10px', background: 'var(--bg-elevated)', borderRadius: '6px', fontSize: '0.9rem', border: '1px solid var(--border-primary)'}}>
                      <div style={{fontWeight: '600', marginBottom: '6px', color: 'var(--accent-cyan)'}}>
                        Item {idx + 1}:
                      </div>
                      {renderAllFields(arrItem, `${fullKey}[${idx}]`)}
                    </div>
                  );
                }
                return (
                  <div key={idx} className="card-row" style={{marginLeft: '16px', padding: '4px 8px', background: 'var(--bg-elevated)', borderRadius: '4px'}}>
                    <span className="card-label" style={{fontSize: '0.85rem'}}>[{idx}]:</span>
                    <span className="card-value-text" style={{fontSize: '0.9rem'}}>{renderValue(key, arrItem)}</span>
                  </div>
                );
              })}
              {value.length > maxItems && (
                <div style={{marginLeft: '16px', padding: '8px', background: 'var(--bg-elevated)', borderRadius: '4px', textAlign: 'center'}}>
                  <span className="card-value-text" style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                    ... and {value.length - maxItems} more item{value.length - maxItems !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      }
      
      if (typeof value === 'object' && value !== null) {
        // Nested object - render recursively with ALL fields
        const nestedKeys = Object.keys(value);
        if (nestedKeys.length === 0) {
          return (
            <div key={fullKey} className="card-row">
              <span className="card-label">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
              <span className="card-value-text value-object">{} (empty object)</span>
            </div>
          );
        }
        return (
          <div key={fullKey} className="card-row" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <span className="card-label" style={{marginBottom: '8px', fontWeight: '600'}}>
              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ({nestedKeys.length} field{nestedKeys.length !== 1 ? 's' : ''}):
            </span>
            <div style={{width: '100%', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '6px', marginLeft: '0', border: '1px solid var(--border-primary)'}}>
              {renderAllFields(value, fullKey)}
            </div>
          </div>
        );
      }
      
      // Special handling for URL fields - make them clickable
      if (typeof value === 'string' && isUrl(value)) {
        // For logo URLs, show just the label text as a hyperlink (don't show the actual URL)
        const isLogoUrl = key.toLowerCase().includes('logo');
        const displayText = isLogoUrl 
          ? key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          : (value.length > 60 ? `${value.slice(0, 60)}...` : value);
        
        return (
          <div key={fullKey} className="card-row">
            <span className="card-label">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
            <span className="card-value-text">
              <a 
                href={value} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  color: 'var(--accent-cyan)',
                  textDecoration: 'underline',
                  wordBreak: 'break-all',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
                title={value}
              >
                {displayText}
              </a>
            </span>
          </div>
        );
      }
      
      return (
        <div key={fullKey} className="card-row">
          <span className="card-label">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
          <span className="card-value-text">{renderValue(key, value)}</span>
        </div>
      );
    };
    
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const field = processValue(key, value, fullKey);
      if (field) fields.push(field);
    });
    
    return fields;
  };

  const renderCard = (item, index) => {
    if (!item || typeof item !== 'object') return null;

    // 1. NFT Items - ALL FIELDS DISPLAYED
    if (item.token_id !== undefined || item.nft_data || item.external_data) {
      const nftImage = item.external_data?.image || item.nft_data?.external_data?.image || item.image_url;
      const nftName = item.external_data?.name || item.nft_data?.external_data?.name || item.name || `Token #${item.token_id || 'N/A'}`;
      
      // Get all keys - no exclusions, show everything
      const allKeys = Object.keys(item);
      
      return (
        <div key={index} className="response-card nft-card">
          <div className="card-header">
            <div className="card-title-section">
              {nftImage && (
                <img src={nftImage} alt={nftName} className="token-logo" style={{width: '80px', height: '80px', borderRadius: '12px'}} onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <div>
                <h4 className="card-title">{nftName}</h4>
                {item.contract_name && (
                  <p className="card-subtitle">{item.contract_name}</p>
                )}
                {item.contract_ticker_symbol && (
                  <p className="card-chain">{item.contract_ticker_symbol}</p>
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
            {/* Render ALL fields dynamically */}
            {renderAllFields(Object.fromEntries(allKeys.map(k => [k, item[k]])))}
          </div>
        </div>
      );
    }

    // 2. Token Balance Items - ALL FIELDS DISPLAYED
    if (item.contract_name || item.contract_ticker_symbol) {
      const logoUrl = item.logo_urls?.token_logo_url || item.contract_logo_url;
      const allKeys = Object.keys(item);
      
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
            {/* Render ALL fields dynamically */}
            {renderAllFields(Object.fromEntries(allKeys.map(k => [k, item[k]])))}
          </div>
        </div>
      );
    }

    // 3. Token Approval Items - ALL FIELDS DISPLAYED
    if (item.spender_address || item.allowance) {
      const logoUrl = item.logo_urls?.token_logo_url || item.contract_logo_url;
      const allKeys = Object.keys(item);
      
      return (
        <div key={index} className="response-card approval-card">
          <div className="card-header">
            <div className="card-title-section">
              {logoUrl && (
                <img src={logoUrl} alt={item.contract_ticker_symbol} className="token-logo" onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <div>
                <h4 className="card-title">Token Approval</h4>
                {item.contract_name && (
                  <p className="card-subtitle">{item.contract_name}</p>
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
            {/* Render ALL fields dynamically */}
            {renderAllFields(Object.fromEntries(allKeys.map(k => [k, item[k]])))}
          </div>
        </div>
      );
    }

    // 4. Block Items - ALL FIELDS DISPLAYED
    if (item.height !== undefined || item.block_height !== undefined || item.signed_at) {
      const blockHeight = item.height || item.block_height;
      
      // Get all keys and exclude the ones we'll show in header
      const headerKeys = ['height', 'block_height', 'block_hash'];
      const allKeys = Object.keys(item);
      const bodyKeys = allKeys.filter(k => !headerKeys.includes(k));
      
      return (
        <div key={index} className="response-card block-card">
          <div className="card-header">
            <div className="card-title-section">
              <div>
                <h4 className="card-title">Block #{blockHeight || 'N/A'}</h4>
                {item.block_hash && (
                  <p className="card-subtitle" title={item.block_hash}>
                    {truncateAddress(item.block_hash)}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="card-body">
            {/* Render ALL fields dynamically */}
            {renderAllFields(Object.fromEntries(bodyKeys.map(k => [k, item[k]])))}
          </div>
        </div>
      );
    }

    // 5. Transaction Items - ALL FIELDS DISPLAYED
    if (item.tx_hash || item.block_signed_at) {
      const gasCost = item.gas_spent && item.gas_price ? (item.gas_spent * item.gas_price) / 1e18 : null;
      const valueInEth = item.value ? item.value / 1e18 : null;
      
      // Get all keys and exclude the ones we'll show in header
      const headerKeys = ['tx_hash', 'successful'];
      const allKeys = Object.keys(item);
      const bodyKeys = allKeys.filter(k => !headerKeys.includes(k));
      
      return (
        <div key={index} className="response-card transaction-card">
          <div className="card-header">
            <div className="card-title-section">
              <div>
                <h4 className="card-title">Transaction Details</h4>
                {item.tx_hash && (
                  <p className="card-subtitle" title={item.tx_hash}>
                    {truncateAddress(item.tx_hash)}
                  </p>
                )}
              </div>
            </div>
            {item.successful !== undefined && (
              <span className={`card-badge ${item.successful ? 'value-true' : 'value-false'}`}>
                {item.successful ? '✓ Success' : '✗ Failed'}
              </span>
            )}
          </div>
          <div className="card-body">
            {/* Render ALL fields dynamically */}
            {renderAllFields(Object.fromEntries(bodyKeys.map(k => [k, item[k]])))}
          </div>
        </div>
      );
    }

    // 6. Log/Event Items - ALL FIELDS DISPLAYED
    if (item.log_offset !== undefined || item.topic_0 || item.raw_log_topics) {
      const allKeys = Object.keys(item);
      
      return (
        <div key={index} className="response-card log-card">
          <div className="card-header">
            <div className="card-title-section">
              <div>
                <h4 className="card-title">Event Log</h4>
                {item.log_offset !== undefined && (
                  <p className="card-subtitle">Offset: #{item.log_offset}</p>
                )}
              </div>
            </div>
          </div>
          <div className="card-body">
            {/* Render ALL fields dynamically */}
            {renderAllFields(Object.fromEntries(allKeys.map(k => [k, item[k]])))}
          </div>
        </div>
      );
    }

    // 7. Token Holder Items - ALL FIELDS DISPLAYED
    if (item.address && item.balance !== undefined && item.contract_address) {
      const logoUrl = item.logo_urls?.token_logo_url || item.contract_logo_url;
      const allKeys = Object.keys(item);
      
      return (
        <div key={index} className="response-card holder-card">
          <div className="card-header">
            <div className="card-title-section">
              {logoUrl && (
                <img src={logoUrl} alt={item.contract_ticker_symbol} className="token-logo" onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <div>
                <h4 className="card-title">Token Holder</h4>
                {item.contract_ticker_symbol && (
                  <p className="card-subtitle">{item.contract_ticker_symbol}</p>
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
            {/* Render ALL fields dynamically */}
            {renderAllFields(Object.fromEntries(allKeys.map(k => [k, item[k]])))}
          </div>
        </div>
      );
    }

    // 8. Price Data Items - ALL FIELDS DISPLAYED
    if (item.prices || item.price !== undefined || item.spot_prices) {
      const logoUrl = item.logo_urls?.token_logo_url || item.contract_logo_url;
      const allKeys = Object.keys(item);
      
      return (
        <div key={index} className="response-card price-card">
          <div className="card-header">
            <div className="card-title-section">
              {logoUrl && (
                <img src={logoUrl} alt={item.contract_ticker_symbol} className="token-logo" onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <div>
                <h4 className="card-title">Price Data</h4>
                {item.contract_ticker_symbol && (
                  <p className="card-subtitle">{item.contract_ticker_symbol}</p>
                )}
              </div>
            </div>
            {item.price !== undefined && (
              <div className="card-value">
                <span className="value-large">{formatCurrency(item.price, item.quote_currency || 'USD')}</span>
              </div>
            )}
          </div>
          <div className="card-body">
            {/* Render ALL fields dynamically */}
            {renderAllFields(Object.fromEntries(allKeys.map(k => [k, item[k]])))}
          </div>
        </div>
      );
    }

    // 9. Chain Info Items - ALL FIELDS DISPLAYED
    if (item.chain_id !== undefined && item.name) {
      const logoUrl = item.logo_urls?.chain_logo_url;
      const allKeys = Object.keys(item);
      
      return (
        <div key={index} className="response-card chain-card">
          <div className="card-header">
            <div className="card-title-section">
              {logoUrl && (
                <img src={logoUrl} alt={item.name} className="token-logo" onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <div>
                <h4 className="card-title">{item.label || item.name}</h4>
                {item.name && item.name !== item.label && (
                  <p className="card-subtitle">{item.name}</p>
                )}
              </div>
            </div>
            {item.is_testnet !== undefined && (
              <span className={`card-badge ${item.is_testnet ? 'value-false' : 'value-true'}`}>
                {item.is_testnet ? 'Testnet' : 'Mainnet'}
              </span>
            )}
          </div>
          <div className="card-body">
            {/* Render ALL fields dynamically */}
            {renderAllFields(Object.fromEntries(allKeys.map(k => [k, item[k]])))}
          </div>
        </div>
      );
    }

    // 10. Generic card for other objects - ALL FIELDS DISPLAYED
    const allKeys = Object.keys(item);
    return (
      <div key={index} className="response-card generic-card">
        <div className="card-header">
          <h4 className="card-title">Item {index + 1}</h4>
        </div>
        <div className="card-body">
          {/* Render ALL fields dynamically */}
          {renderAllFields(Object.fromEntries(allKeys.map(k => [k, item[k]])))}
        </div>
      </div>
    );
  };

  const getDataItems = () => {
    if (!response) return [];
    
    // Common response structures from Covalent API
    if (response.data?.items && Array.isArray(response.data.items)) {
      return response.data.items;
    }
    if (response.items && Array.isArray(response.items)) {
      return response.items;
    }
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
    
    // Handle nested structures (e.g., data.data.items)
    if (response.data?.data?.items && Array.isArray(response.data.data.items)) {
      return response.data.data.items;
    }
    
    // Handle transaction summary structure
    if (response.data?.summary) {
      return [response.data.summary];
    }
    
    // Handle block structure with transactions
    if (response.data?.items && Array.isArray(response.data.items)) {
      return response.data.items;
    }
    
    // Handle price data structures
    if (response.data?.prices && Array.isArray(response.data.prices)) {
      return response.data.prices;
    }
    if (response.prices && Array.isArray(response.prices)) {
      return response.prices;
    }
    
    // Handle chain lists
    if (response.data?.chains && Array.isArray(response.data.chains)) {
      return response.data.chains;
    }
    if (response.chains && Array.isArray(response.chains)) {
      return response.chains;
    }
    
    // Handle single transaction object
    if (response.data?.tx_hash || response.tx_hash) {
      return [response.data || response];
    }
    
    // Handle single block object
    if (response.data?.height !== undefined || response.data?.block_height !== undefined) {
      return [response.data];
    }
    
    // Handle single NFT object
    if (response.data?.token_id !== undefined || response.token_id !== undefined) {
      return [response.data || response];
    }
    
    // Handle array responses directly
    if (Array.isArray(response)) {
      return response;
    }
    
    // If it's a single object with nested data, try to extract items
    if (typeof response === 'object' && response.data) {
      // If data is an object (not array), wrap the whole response
      if (typeof response.data === 'object' && !Array.isArray(response.data)) {
        return [response.data];
      }
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

