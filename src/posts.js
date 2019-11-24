
const getPosts = (feed) => [feed.payload.items, feed.payload.meta];
const fetchLatestPosts = async (api) => fetchPosts(api, undefined);
const fetchPosts = async (api, cursor) => api.fetchFeed(cursor).then(getPosts);

exports.fetchLatestPosts = fetchLatestPosts;
exports.fetchPosts = fetchPosts;