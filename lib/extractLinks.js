const cheerio = require('cheerio');

module.exports = (body) => {
    const $ = cheerio.load(body);
    const links = $('a');
    return links ? links.toArray() : [];
};
