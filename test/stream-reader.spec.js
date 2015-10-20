var expect = require('expect.js'),
  streamReader = require('../src/stream-reader')();

function createFrom(text) {
  var s = new require('stream').Readable();
  s.push(text);
  s.push(null);
  return s;
}

describe('The stream reader', function () {

  it('can read from a string stream', function (done) {
    streamReader
      .process(createFrom('the cat'))
      .then(function (result) {
        expect(result.the).to.be(1);
        expect(result.cat).to.be(1);
        done();
      });
  });

});