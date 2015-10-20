var expect = require('expect.js'),
  promise = require('bluebird'),
  streamReader = require('../src/stream-reader')(),
  _ = require('lodash');

function createFromString(text) {
  return new promise(function (resolve) {
    var s = new require('stream').Readable();
    s.push(text);
    s.push(null);
    resolve(s);
  });
}

function createFromUrl(url) {
  return new promise(function (resolve) {
    require('http').get(url, function (response) {
      resolve(response);
    });
  });
}

describe('The stream reader', function () {

  it('can read from a string stream', function (done) {
    streamReader
      .process(createFromString('The quick brown fox jumps over the lazy dog'))
      .then(function (result) {
        expect(result.the).to.be(2);
        expect(result.quick).to.be(1);
        expect(result.brown).to.be(1);
        expect(result.fox).to.be(1);
        expect(result.jumps).to.be(1);
        expect(result.over).to.be(1);
        expect(result.lazy).to.be(1);
        expect(result.dog).to.be(1);
      })
      .finally(done);
  });

  it('can read from a HTTP stream', function (done) {
    this.timeout(60000);
    streamReader
      .process(createFromUrl('http://textfiles.com/etext/REFERENCE/feder15.txt'))
      .then(function (result) {
        expect(result.your).to.be(34);
      })
      .finally(done);
  });

});