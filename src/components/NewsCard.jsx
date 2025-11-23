import React from 'react';

const NewsCard = ({ article }) => {
    const { title, summary, banner_image, source, url, time_published, overall_sentiment_label } = article;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        // Format: 20230401T123000 -> April 1, 2023
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return new Date(`${year}-${month}-${day}`).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getSentimentColor = (label) => {
        if (label === 'Bullish') return 'var(--success-color)';
        if (label === 'Bearish') return 'var(--error-color)';
        return 'var(--text-secondary)';
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--surface-color)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                height: '100%'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'var(--primary-color)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
        >
            <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#000' }}>
                {banner_image ? (
                    <img
                        src={banner_image}
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        backgroundColor: 'var(--surface-hover)'
                    }}>
                        No Image
                    </div>
                )}
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {source}
                    </span>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: getSentimentColor(overall_sentiment_label),
                        border: `1px solid ${getSentimentColor(overall_sentiment_label)}`,
                        padding: '0.125rem 0.375rem',
                        borderRadius: '4px'
                    }}>
                        {overall_sentiment_label}
                    </span>
                </div>
                <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1
                }}>
                    {summary}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 'auto' }}>
                    {formatDate(time_published)}
                </div>
            </div>
        </a>
    );
};

export default NewsCard;
