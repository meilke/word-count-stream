var streamReader = require('./src/stream-reader')(),
  httpStream = require('./src/streams/http-stream')(),
  argv = require('yargs').argv,
  _ = require('lodash');

function processData() {
  var options = {
    separator: argv.separator || ' ',
    atOnce: argv.atOnce || 1000
  };
  return streamReader.process(httpStream.createFromUrl(argv.input), options);
}

processData()
  .then(function (result) {
    console.log(result);
    return result;
  })
  .then(function (result) {
    console.log('Found %d terms!', _.keys(result).length);
  })
  .catch(console.error);