import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ApiKeyModal from './components/ApiKeyModal';
import SearchBar from './components/SearchBar';
import CategoryNav from './components/CategoryNav';
import NewsList from './components/NewsList';
import { useApiKey } from './context/ApiKeyContext';
import { fetchNews } from './services/alphaVantage';

function App() {
  const { apiKey } = useApiKey();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('technology');

  useEffect(() => {
    if (apiKey) {
      loadNews({ topic: activeCategory });
    }
  }, [apiKey, activeCategory]);

  const loadNews = async (params) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchNews(apiKey, params);
      setNews(data);
    } catch (err) {
      setError(err.message);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (ticker) => {
    setActiveCategory(''); // Clear category when searching
    loadNews({ ticker });
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    // Effect will trigger loadNews
  };

  return (
    <Layout>
      <ApiKeyModal />

      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>
          Market Insights
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Stay ahead with real-time stock news and sentiment analysis.
        </p>

        <SearchBar onSearch={handleSearch} />
        <div style={{ marginTop: '1.5rem' }}>
          <CategoryNav activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--error-color)',
          color: 'var(--error-color)',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{
            display: 'inline-block',
            width: '2rem',
            height: '2rem',
            border: '3px solid var(--surface-hover)',
            borderTopColor: 'var(--primary-color)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <NewsList news={news} />
      )}
    </Layout>
  );
}

export default App;
