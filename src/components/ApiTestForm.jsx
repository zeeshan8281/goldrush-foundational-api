import React, { useState, useId } from 'react';
import ResponseDisplay from './ResponseDisplay';

const ApiTestForm = ({ title, description, fields, onSubmit, apiKey }) => {
  const formId = useId(); // Generate unique ID for this form instance
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await onSubmit(apiKey, formData);
      setResponse(result);
    } catch (err) {
      setError(err.response?.data?.error_message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    alert('Response copied to clipboard!');
  };

  return (
    <div className="api-form-container">
      <div className="api-form-header">
        <h3>{title}</h3>
        {description && <p className="api-description">{description}</p>}
      </div>

      <form onSubmit={handleSubmit} className="api-form">
        {fields.map((field) => {
          const fieldId = `${formId}-${field.name}`;
          return (
            <div key={field.name} className="form-field">
              <label htmlFor={fieldId}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  id={fieldId}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  id={fieldId}
                  name={field.name}
                  checked={formData[field.name] || false}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  id={fieldId}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
              {field.helpText && <small className="help-text">{field.helpText}</small>}
            </div>
          );
        })}

        <button type="submit" disabled={loading || !apiKey} className="submit-btn">
          {loading ? 'Loading...' : 'Test API'}
        </button>
      </form>

      {error && (
        <div className="error-container">
          <h4>Error:</h4>
          <pre>{error}</pre>
        </div>
      )}

      {response && (
        <div className="response-container">
          <div className="response-actions">
            <button onClick={copyToClipboard} className="copy-btn">Copy JSON</button>
          </div>
          <ResponseDisplay response={response} />
        </div>
      )}
    </div>
  );
};

export default ApiTestForm;

