module.exports = function Timer(inc, timeout, cond) {
  var time = 0;
  var res;
  var rej;
  const p = new Promise((r, _r) => { res = r; rej = _r; });
  const i = setInterval(()=> {
    if (cond()) {
      clearInterval(i);
      res();
    } else if (time >= timeout) rej('Timeout occurred...');
    time += inc;
  }, inc);

  return p;
};
