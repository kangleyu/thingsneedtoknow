function compute_intersection(arr1, arr2, callback) {
  // break up the bigger of the the two arrays
  var bigger = arr1.length > arr2.length ? arr1 : arr2;
  var smaller = bigger == arr1 ? arr2 : arr1;
  var biglen = bigger.length, smlen = smaller.length;

  var sidx = 0, size = 10, results = [];

  // for each chunk of "size" elements in bigger, search through smaller
  function sub_compute_intersection() {
    var i = sidx;
    for(; i < (sidx + size) && i < biglen; i++) {
      for(var j = 0; j < smlen; j++) {
        if (bigger[i] == smaller[j]) {
          results.push(smaller[j]);
          break;
        }
      } 
    }
    if(i >= biglen) { // no error, send back results
      callback(null, results);
    } else {
      sidx += size;
      // give all other events ore requests a chance to do their
      // work, only when there has no events, the continute our tick
      process.nextTick(sub_compute_intersection);
    }
  }

  sub_compute_intersection();
}

module.exports = compute_intersection;