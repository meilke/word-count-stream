'use strict';

var promise = require('bluebird');

function createFromString(text) {
  return new promise(function (resolve) {
    var s = new require('stream').Readable();
    s.push(text);
    s.push(null);
    resolve(s);
  });
}

function initialize() {
  return {
    createFromString: createFromString
  };
}

module.exports = initialize;