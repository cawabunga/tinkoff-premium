let postsCache;

export const loadPosts = async (limit, offset) => {
    if (!postsCache) {
        const response = await fetch('./json/posts.json');
        postsCache = await response.json();
    }

    return postsCache.slice(offset, offset + limit);
};