const fs = require('fs');
const { getPosts } = require('./posts-downloader');

const exportPostsAsJSON = async (file, pgClient) => {
    const posts = await getPosts(pgClient);

    return await new Promise((resolve, reject) => {
        const json = JSON.stringify(posts);
        fs.writeFile(file, json, 'utf8', (err) => {
            err ? reject(err) : resolve(true);
        });
    });
};

exports.exportPostsAsJSON = exportPostsAsJSON;