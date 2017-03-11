const path = require('path');
const express = require('express');
const serveFavicon = require('serve-favicon');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const got = require('got');
const extractLinks = require('./lib/extractLinks');
const normalizeLinks = require('./lib/normalizeLinks');
const writeResultsToFile = require('./lib/writeResultsToFile');
const linksPage = require('./lib/links');

const PORT = process.env.port || 3000;

const app = express();

app
    .use(serveFavicon(path.join('static', 'favicon.ico')))
    .use(serveStatic(path.join('static')))
    .use(bodyParser.urlencoded({ extended: true }))
    .post('/links', (req, res) => {
        got(req.body.url, { retries: 1, timeout: 5000 })
          .then((response) => {
              const linksArray = normalizeLinks(response.url, extractLinks(response.body));
              const results = { linksArray, url: response.url };
              return writeResultsToFile(results)
              .then((pathName) => {
                  console.log('Written successfully to ', pathName);
                  res.send(linksPage(Object.assign(results, { pathName })));
              });
          })
          .catch((error) => {
              console.error(error);
              res.status(500).send(error);
          });
    })
    .listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
