function async(generatorFn) {
  var generator = generatorFn.apply(this, arguments);
  var handleResult = function(result) {
    if(result.done) return result.value;
      // In our example, the result.value would be a jqXHR object, which has a
      // then() method that is similar in its contract to the Promise objects
      // specified in A+ promises (for ex. https://www.promisejs.org/)
      return result.value.then(function(nextResult) {
        // Push the result back to the generator. This will be the
        // return value of the corresponding yield operation.
        return handleResult(generator.next(nextResult));
    }, function(error) {
      // Propagate the error back to the generator. This exception will be
      // thrown from the current suspended context of the generator, as if
      // the yield statement that is currently suspended were a `throw`
      // statement.
      generator.throw(error);
    })
  };
  return handleResult(generator.next());
}
So, how do we use this. Well, pretty simple. If you want to have multiple async calls executed one by one:

async(function *() {
  try {
    // With jQuery, the XHR objects returned by the $.ajax method calls are
    // somewhat like a Promise object (they have the then() method, which is all
    // we require for this code. If you want a full Promise implementation with
    // jQuery, you can call promise() on any jQuery object.)
    var result1 = yield $.ajax("/request1");
    var result2 = yield $.ajax("/request2");
    var result3 = yield $.ajax("/request3");
    // Do something with the results
    console.log(result1, result2, result3);
  } catch(xhr) {
    console.log("Error: " + xhr);
  }
});