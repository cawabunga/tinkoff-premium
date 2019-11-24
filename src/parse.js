exports.extractLinks = (str) => {
    return [...new Set([...str.matchAll(/href="([^(")]+)"/g)].map(arr => arr[1]))];
};