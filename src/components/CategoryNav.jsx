import React from 'react';

const CATEGORIES = [
    { id: 'technology', label: 'Technology' },
    { id: 'finance', label: 'Finance' },
    { id: 'economy_macro', label: 'Economy' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'ipo', label: 'IPO' },
    { id: 'blockchain', label: 'Crypto' },
];

const CategoryNav = ({ activeCategory, onSelectCategory }) => {
    return (
        <div style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            padding: '1rem 0',
            justifyContent: 'center',
            flexWrap: 'wrap'
        }}>
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        border: '1px solid',
                        borderColor: activeCategory === cat.id ? 'var(--primary-color)' : 'var(--border-color)',
                        backgroundColor: activeCategory === cat.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                        color: activeCategory === cat.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s'
                    }}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
};

export default CategoryNav;
