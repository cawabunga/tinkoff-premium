const fs = require('fs');
const padStart = require('string.prototype.padstart');
const request = require('request');

const files = Array(14).fill(null).map((_, i) => `../json/feed/${padStart(i + 1, 2, 0)}.json`);

const DISCLAIMER_URL = 'https://static2.tinkoff.ru/wm/feed/Disclaimer_Tinkoff_Investments_Premium.pdf';
const TINKOFF_URL = 'https://static2.tinkoff.ru';

const result = files
    .map(file => require(file))
    .map(json => json.payload.items)
    .filter(Boolean)
    .flat()
    .map(item => item.item)
    .flatMap(item =>
        extractLinks(item.body)
            .filter(url => url.slice(-4) === '.pdf')
            .filter(url => url !== DISCLAIMER_URL)
            .filter(url => url.startsWith(TINKOFF_URL))
            .map(url => [
                item.date.slice(0, 10),
                item.title,
                url,
            ])
    )
;

console.log(result.map(entry => entry[2]).slice(0, 40).join('\n'));

// download(result);

async function download(entries) {
    for (const entry of entries) {
        await new Promise((resolve, reject) => {
            const [postDate, postTitle, url] = entry;

            const fileName = [
                postDate,
                postTitle,
                url.slice(url.lastIndexOf('/') + 1),
            ].join(' | ');

            const file = fs.createWriteStream(`../pdf/${fileName}`);
            const stream = request({
                uri: url,
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                    'Cache-Control': 'max-age=0',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
                },
                gzip: true,
            })
                .pipe(file)
                .on('finish', () => {
                    console.log(`${url} is finished downloading.`);
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }
}


function extractLinks(str) {
    return [...new Set([...str.matchAll(/href="([^(")]+)"/g)].map(arr => arr[1]))];
}