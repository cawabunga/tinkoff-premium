
const getPosts = (feed) => feed.payload.items;
const fetchLatestPosts = async (api) => api.fetchFeed().then(getPosts);

exports.fetchLatestPosts = fetchLatestPosts;