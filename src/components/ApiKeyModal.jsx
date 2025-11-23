import React, { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';

const ApiKeyModal = () => {
    const { apiKey, setApiKey } = useApiKey();
    const [inputVal, setInputVal] = useState('');
    const [error, setError] = useState('');

    if (apiKey) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputVal.trim()) {
            setError('Please enter a valid API key');
            return;
        }
        setApiKey(inputVal.trim());
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
        }}>
            <div style={{
                backgroundColor: 'var(--surface-color)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '400px',
                width: '90%',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Welcome to StockNews</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    To access real-time stock news, please enter your Alpha Vantage API key.
                    Your key is stored locally in your browser.
                </p>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter your API Key"
                            value={inputVal}
                            onChange={(e) => {
                                setInputVal(e.target.value);
                                setError('');
                            }}
                        />
                        {error && <p style={{ color: 'var(--error-color)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Get Started
                    </button>
                </form>
                <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    Don't have a key? <a href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>Get a free one here</a>.
                </p>
            </div>
        </div>
    );
};

export default ApiKeyModal;
