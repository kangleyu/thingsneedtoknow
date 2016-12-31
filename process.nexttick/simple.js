function defferd() {
  console.log("This message was deffered to next tick");
}

module.exports = function() {
  process.nextTick(defferd);
  console.log("This message was NOT deffered");
};