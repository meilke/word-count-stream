'use strict';

var promise = require('bluebird');

function createFromUrl(url) {
  return new promise(function (resolve) {
    require('http').get(url, function (response) {
      resolve(response);
    });
  });
}

function initialize() {
  return {
    createFromUrl: createFromUrl
  };
}

module.exports = initialize;