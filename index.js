'use strict';

var through = require('through2');
var PluginError = require('plugin-error');

var PLUGIN_NAME = 'gulp-vscode-snippet-formatter';

module.exports = function () {

  var transform = function (file, encoding, callback) {
    var error = null;
    var output = "";

    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
    } else if (file.isBuffer()) {
      var codeText = file.contents.toString();
      var snippetText = codeText
        .replace(/"/g, '\\"')
        .split(/[\r\n]+/)
        .map((line, index) => { return `"${line}"`; })
        .join(",\r\n")

      file.contents = new Buffer(snippetText);
      this.push(file);
    }

    callback(error, null);
  };

  return through.obj(transform);
};