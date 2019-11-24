const fetch = require('node-fetch');

const createFeedUrl = (sessionId, cursor = '', limit = 50) => {
    return `https://api-invest.tinkoff.ru/smartfeed-public/v1/feed/api/main?origin=mobile,ib5,loyalty,platform&ccc=true&cpswc=true&platform=ios&sessionId=${sessionId}&appName=investing&appVersion=4.2.1&deviceId=D87AE351-EAE4-4C5E-ABFC-08E89734B588&limit=${limit}&nav_id=49&cursor=${cursor}`;
};

exports.API = (sessionId) => {

    const fetchFeed = async (cursor) => {
        const url = createFeedUrl(sessionId, cursor);
        console.log(`GET ${url}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'User-Agent': 'Investing/4683 CFNetwork/1120 Darwin/19.0.0',
                'Accept-Language': 'en-us',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
            },
        });

        const result = await response.json();

        if (result.status === 'Ok') {
            return result;
        } else if (result.status === 'Error') {
            throw new Error(result.payload.message);
        } else {
            throw new Error('Unknown tinkoff api error.');
        }
    };

    return {
        fetchFeed
    };
};
