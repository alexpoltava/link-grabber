const fs = require('fs');
const path = require('path');
const url = require('url');

const DIR_NAME = './results';

module.exports = (results) => {
    const hostname = url.parse(results.url).hostname;
    const pathName = path.format({
        dir: DIR_NAME,
        name: hostname,
        ext: '.json'
    });

    fs.mkdir(DIR_NAME, (err) => {
        if (err && err.code !== 'EEXIST') console.error(err);
    });
    return new Promise((resolve, reject) => {
        fs.writeFile(pathName, JSON.stringify(results), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(pathName);
            }
        });
    });
};
