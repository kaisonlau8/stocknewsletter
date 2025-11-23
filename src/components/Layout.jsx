import React from 'react';
import { useApiKey } from '../context/ApiKeyContext';

const Layout = ({ children }) => {
    const { setApiKey } = useApiKey();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{
                borderBottom: '1px solid var(--border-color)',
                padding: '1rem 0',
                backgroundColor: 'rgba(15, 17, 21, 0.8)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.025em' }}>
                        <span style={{ color: 'var(--primary-color)' }}>Stock</span>News
                    </h1>
                    <button
                        onClick={() => setApiKey('')}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-secondary)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.875rem'
                        }}
                    >
                        Reset API Key
                    </button>
                </div>
            </header>
            <main style={{ flex: 1, padding: '2rem 0' }}>
                <div className="container">
                    {children}
                </div>
            </main>
            <footer style={{
                borderTop: '1px solid var(--border-color)',
                padding: '2rem 0',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem'
            }}>
                <div className="container">
                    <p>Powered by Alpha Vantage. Built with React.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
