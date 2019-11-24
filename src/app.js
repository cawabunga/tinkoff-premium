const dotenv = require('dotenv');
const { Client } = require('pg');
const { API } = require('./tinkoff-api');
const { download } = require('./posts-downloader');

dotenv.config();
const pgClient = new Client();
const tinkoffApi = API(process.env.SECRET_SESSION_ID);

new Promise(async () => {
    try {
        pgClient.connect();
        await download(tinkoffApi, pgClient);
        console.log('Done');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});