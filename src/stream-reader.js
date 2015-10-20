'use strict';

var _ = require('lodash'),
  promise = require('bluebird');

function add(result, term) {
  if (result[term]) {
    result[term]++;
  } else {
    result[term] = 1;
  }
}

function process(stream) {
  return new promise(function (resolve) {
    var result = {};
    stream.on('readable', function() {
      var chunk;
      while (null !== (chunk = stream.read(100))) {
        var chunkAsString = chunk.toString();
        var chunkSplit = chunkAsString.split(' ');
        _.each(chunkSplit, _.partial(add, result));
      }
    });
    stream.on('end', function() {
      resolve(result);
    });
  });
}

function initialize() {
  return {
    process: process
  };
}

module.exports = initialize;