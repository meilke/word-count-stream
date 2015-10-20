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
      .process(createFrom('The quick brown fox jumps over the lazy dog'))
      .then(function (result) {
        expect(result.the).to.be(2);
        expect(result.quick).to.be(1);
        expect(result.brown).to.be(1);
        expect(result.fox).to.be(1);
        expect(result.jumps).to.be(1);
        expect(result.over).to.be(1);
        expect(result.lazy).to.be(1);
        expect(result.dog).to.be(1);
        done();
      });
  });

});