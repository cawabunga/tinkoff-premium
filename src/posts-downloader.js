const { fetchLatestPosts } = require('./posts');

exports.download = async (tinkoffApi, pgClient) => {
    const posts = await fetchLatestPosts(tinkoffApi);
    const insertings = posts.map(insertPost(pgClient));
    return Promise.all(insertings);
};

const insertPost = client => post => (
    client.query(`INSERT INTO
        posts(tinkoff_post_id, type, title, body, date, img_big)
        VALUES($1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING`, [
            post.item.id,
            post.type,
            post.item.title,
            post.item.body,
            new Date(post.item.date),
            post.item.img_big,
        ]
    )
);