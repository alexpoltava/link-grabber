const url = require('url');

module.exports = (root, rawLinksArray = []) =>
    rawLinksArray.reduce((arr, link) => {
        if (link.attribs.href === undefined) return arr;
        return arr.concat(url.resolve(root, link.attribs.href));
    }, []);
