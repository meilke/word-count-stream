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

function process(streamPromise, options) {
  return streamPromise.then(function (stream) {
    return new promise(function (resolve) {
      var result = {},
        partialEnd;

      stream.on('readable', function() {
        var chunk;
        while (null !== (chunk = stream.read(options.atOnce))) {
          var chunkAsString = chunk.toString().toLowerCase().replace(/(\r\n|\n|\r)/gm, options.separator);
          var chunkSplit = chunkAsString.split(options.separator);

          var last = chunkSplit[chunkSplit.length - 1];
          var first = chunkSplit[0];

          if (partialEnd) {
            add(result, partialEnd + first);
          }

          if (_.endsWith(chunkAsString, last)) {
            partialEnd = last;
            chunkSplit.pop();
          } else {
            partialEnd = undefined;
          }

          _.each(chunkSplit, _.partial(add, result));

          if (global.gc) {
            global.gc();
          }
        }
      });
      stream.on('end', function() {
        if (partialEnd) {
          add(result, partialEnd);
        }
        resolve(result);
      });
    });
  });
}

function initialize() {
  return {
    process: process
  };
}

module.exports = initialize;