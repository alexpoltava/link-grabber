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
    return new Promise((resolve, reject) => {
        fs.mkdir(DIR_NAME, (err) => {
            if (err && err.code !== 'EEXIST') {
                console.log('error', err.code);
                reject(err);
            }
            fs.writeFile(pathName, JSON.stringify(results), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    resolve(pathName);
                }
            });
        });
    });
};
