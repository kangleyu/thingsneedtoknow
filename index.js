// Sample of callback hell
var callbackhell = require('./callbackhell/callbackhell');

callbackhell('./data', function(err, file) {
  console.log("Find the largest file is " + file)
})

var asynccallback = require('./callbackhell/withasync');
asynccallback('./data', function(err, file) {
  console.log("Find the largest file is " + file);
})

var promisesample = require('./callbackhell/withpromise');
promisesample('./data')
  .then(function(file) {
    console.log("File the largest file is " + file);
  })
  .catch(console.error);

// Sample of process.nexttick
var deffered = require('./process.nexttick/simple');
deffered();

var arr1 = [1,3,5,1,6,8,9,10,2,3,23,45,67,11,20];
var arr2 = [1,3,51,12,6,8,9,102,22,32,22,34,67,21,20,100,86];

var computer = require('./process.nexttick/cpu_intensive');
computer(arr1, arr2, function(err, result) {
  result.forEach(function(el) {
    console.log(el);
  });
});
console.log("Some work from other events");



