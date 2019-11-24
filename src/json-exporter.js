require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const { getPosts } = require('./posts-downloader');

const pgClient = new Client();

new Promise(async () => {
    try {
        pgClient.connect();

        const posts = await getPosts(pgClient);

        await new Promise((resolve, reject) => {
            const json = JSON.stringify(posts);
            fs.writeFile(`./frontend/json/posts.json`, json, 'utf8', (err) => {
                err ? reject(err) : resolve();
            });
        });

        console.log('Done');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});