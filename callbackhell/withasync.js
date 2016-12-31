var fs = require('fs');
var path = require('path');
var async = require('async');

module.exports = function(dir, callback) {
  async.waterfall([
    function(next) {
      fs.readdir(dir, next);
    },
    function(files, next) {
      var paths = files.map(function(file) { return path.join(dir, file); });
      async.map(paths, fs.stat, function(err, stats) {
        next(err, files, stats);
      });
    },
    function(files, stats, next) {
      var largest = stats
        .filter(function(stat) { return stat.isFile(); })
        .reduce(function(prev, next) {
          if(prev.size > next.size) return prev;
          return next;
        });
        next(null, files[stats.indexOf(largest)]);
    }
  ], callback);
};