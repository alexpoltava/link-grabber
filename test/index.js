const assert = require('assert');
const url = require('url');
const fs = require('fs');
const path = require('path');

const extractLinks = require('../lib/extractLinks');
const normalizeLinks = require('../lib/normalizeLinks');
const writeResultsToFile = require('../lib/writeResultsToFile');

const test5LinksHtml = require('./html/test5links');
const test0LinksHtml = require('./html/test0links');

const test28array = require('./array/test28.js');
const test0array = require('./array/test0.js');

describe('extractLinks', function() {
    it('should extract all valid links  from html properly', function() {
        assert.equal(extractLinks(test5LinksHtml).length, 5, 'Fail');
    });
    it('should return empty array in case of 0 links properly', function() {
        assert.deepEqual(extractLinks(test0LinksHtml), [], 'Fail');
    });
});

describe('normalizeLinks', function() {
    it('should extract all valid links from raw array properly', function() {
        assert.equal(normalizeLinks('http://nodejs.org/', test28array).length, 28, 'Fail');
    });
    it('should return empty array in case of 0 array length properly', function() {
        assert.deepEqual(normalizeLinks('', test0array), [], 'Fail');
    });
    it('should be an array of valid links', function() {
        normalizeLinks('http://nodejs.org/', test28array).forEach(link =>
            assert.ok(url.parse(link).hostname)
        );
    });
});
