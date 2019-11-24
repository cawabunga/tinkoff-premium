const { fetchPosts } = require('./posts');

const download = async (tinkoffApi, pgClient, cursor) => {
    const [posts, meta] = await fetchPosts(tinkoffApi, cursor);
    const safePosts = posts || [];
    const insertings = safePosts.map(exports.insertPost(pgClient));
    await Promise.all(insertings);
    console.log(`Written ${safePosts.length} posts`);
    return meta;
};

const downloadCascade = async (tinkoffApi, pgClient, cursor) => {
    if (cursor === '') {
        return true;
    } else {
        const meta = await download(tinkoffApi, pgClient, cursor);
        return downloadCascade(tinkoffApi, pgClient, meta.cursor);
    }
};

exports.download = downloadCascade;

exports.insertPost = client => async post => (
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

exports.getPosts = async client => {
    const result = await client.query(`SELECT * from posts ORDER BY date DESC`);
    return result.rows;
};