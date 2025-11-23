import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ news }) => {
    if (!news || news.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                <p>No news found. Try searching for a different ticker or category.</p>
            </div>
        );
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
        }}>
            {news.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
        </div>
    );
};

export default NewsList;
