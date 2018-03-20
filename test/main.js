'use strict';

var concatStream = require('concat-stream');
var plugin = require('../');
var fs = require('fs');
var should = require('should');
var File = require('vinyl');

function createFixturesFile(filename) {
  return new File({
    path: 'test/fixtures/' + filename,
    cwd: 'test/',
    base: 'test/fixtures',
    contents: fs.readFileSync('test/fixtures/' + filename)
  });
}

function createExpectedFile(filename) {
  return new File({
    path: 'test/expected/' + filename,
    cwd: 'test/',
    base: 'test/expected',
    contents: fs.readFileSync('test/expected/' + filename)
  });
}

describe('gulp-vscode-snippet-formatter', function () {

  describe('buffered input', function () {

    it('converts plain JSX into snippet body', function (done) {
      var file = createFixturesFile('jsx.input');

      var stream = plugin();
      stream.on('data', function (newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(fs.readFileSync('test/expected/jsx.output', 'utf8'));
        done();
      });

      stream.write(file);
      stream.end();
    });

    it('converts JSX with placeholders into snippet body', function (done) {
      var file = createFixturesFile('jsx-placeholders.input');

      var stream = plugin();
      stream.on('data', function (newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(fs.readFileSync('test/expected/jsx-placeholders.output', 'utf8'));
        done();
      });

      stream.write(file);
      stream.end();
    });

  });

});
