var fs = require('fs');
var path = require('path');

module.exports = function(dir, callback) {
  fs.readdir(dir, function(err, files) { 
    if(err) return callback(err);
    var counter = files.length;
    var errored = false;
    var stats = [];

    files.forEach(function(file, index) { 
      fs.stat(path.join(dir, file), function(err, stat) {
        if (errored) return;
        if (err) {
          errored = true;
          return callback(err);
        }
        stats[index] = stat;

        if(--counter == 0) {
          var largest = stats
            .filter(function(stat) { return stat.isFile() })
            .reduce(function(prev, next) {
              if(prev.size > next.size) return prev;
              return next;
            });
          callback(null, files[stats.indexOf(largest)]);
        }
      });
    });
  });
};