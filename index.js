var streamReader = require('./src/stream-reader')(),
  httpStream = require('./src/streams/http-stream')(),
  stringStream = require('./src/streams/string-stream')(),
  argv = require('yargs').argv,
  request = require('request-promise'),
  random = require('randomstring'),
  _ = require('lodash'),
  size = argv.size || 1024;

function processFromUrl(options) {
  return streamReader.process(httpStream.createFromUrl(argv.url), options);
}

function processFromRandomString(options) {
  return streamReader.process(stringStream.createFromString(random.generate(size)), options);
}

function processFromRandomOrg(options) {
  var requestOptions = {
      method: 'POST',
      uri: 'https://api.random.org/json-rpc/1/invoke',
      body: {
        jsonrpc: '2.0',
        method: 'generateBlobs',
        params: {
          apiKey: 'e200488f-4774-4283-9e92-ca567875afb9',
          n: 1,
          size: size
        },
        id: 42
      },
      json: true
    };

    return request(requestOptions)
      .then(function (result) {
        return streamReader.process(stringStream.createFromString(result.result.random.data[0]), options);
      });
}

function processData() {
  var options = {
    separator: argv.separator || ' ',
    atOnce: argv.atOnce || 1000
  };

  if (argv.url) {
    return processFromUrl(options);
  } else if (argv.randomOrg) {
    return processFromRandomOrg(options);
  } else if (argv.random) {
    return processFromRandomString(options);
  }
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