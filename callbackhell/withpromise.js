var fs = require('fs');
var path = require('path');
var promise = require('promise');
var fs_readdir = promise.denodeify(fs.readdir);
var fs_stat = promise.denodeify(fs.stat);

module.exports = function(dir) {
  return fs_readdir(dir)
    .then(function(files) {
      var promises = files.map(function(file) {
        return fs_stat(path.join(dir, file));
      });
      return promise.all(promises).then(function(stats) {
        return [files, stats];
      });
    })
    .then(function(data) {
      var files = data[0], stats = data[1];
      var largest = stats
        .filter(function(stat) { return stat.isFile(); })
        .reduce(function(prev, next) {
          if(prev.size > next.size) return prev;
          return next;
        });
      return files[stats.indexOf(largest)];
    });
};