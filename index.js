var streamReader = require('./src/stream-reader')(),
  httpStream = require('./src/streams/http-stream')(),
  argv = require('yargs').argv,
  _ = require('lodash');

function processData() {
  return streamReader.process(httpStream.createFromUrl(argv.input));
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