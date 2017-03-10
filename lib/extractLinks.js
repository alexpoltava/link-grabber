const cheerio = require('cheerio');

module.exports = (body) => {
    const $ = cheerio.load(body);
    return $('a') ? $('a').toArray() : [];
};
