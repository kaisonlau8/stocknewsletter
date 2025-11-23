const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchNews = async (apiKey, { ticker, topic, category }) => {
    if (!apiKey) throw new Error('API Key is required');

    const params = new URLSearchParams({
        function: 'NEWS_SENTIMENT',
        apikey: apiKey,
        limit: '50', // Fetch a reasonable amount
    });

    if (ticker) params.append('tickers', ticker);
    if (topic) params.append('topics', topic);
    // Note: Alpha Vantage uses 'topics' for categories like 'technology', 'finance' etc.

    try {
        const response = await fetch(`${BASE_URL}?${params.toString()}`);
        const data = await response.json();

        if (data.Note || data.Information) {
            // Handle API limits or messages
            console.warn('Alpha Vantage API Message:', data.Note || data.Information);
            if (data.Note && data.Note.includes('call frequency')) {
                throw new Error('API rate limit exceeded. Please try again later.');
            }
        }

        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }

        return data.feed || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};
