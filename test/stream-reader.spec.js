var expect = require('expect.js'),
  streamReader = require('../src/stream-reader')(),
  stringStream = require('../src/streams/string-stream')(),
  httpStream = require('../src/streams/http-stream')(),
  random = require('randomstring'),
  _ = require('lodash');

describe('The stream reader', function () {

  it('can read from a normal string stream', function (done) {
    var options = {
      separator: ' ',
      atOnce: 20
    };
    streamReader
      .process(stringStream.createFromString('The quick brown fox jumps over the lazy dog'), options)
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

  it('can read from a random string stream', function (done) {
    var options = {
      separator: '9',
      atOnce: 20
    };
    streamReader
      .process(stringStream.createFromString(random.generate(20000)), options)
      .then(function (result) {
        expect(_.keys(result).length).to.be.greaterThan(10);
      })
      .finally(done);
  });

  it('can read from a HTTP stream', function (done) {
    this.timeout(60000);
    var options = {
      separator: ' ',
      atOnce: 1000
    };
    streamReader
      .process(httpStream.createFromUrl('http://textfiles.com/etext/REFERENCE/feder15.txt'), options)
      .then(function (result) {
        expect(result.your).to.be(34);
      })
      .finally(done);
  });

});