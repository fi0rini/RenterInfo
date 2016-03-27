/**
 * geoip has been moved into the frontend server
 */
const geoip = (function (geoip) {

  return function (req,res,next) {
    // for production use
    //const ip = req.connection.remoteAddress;

    const ip = '128.143.0.0';
    const loc = geoip.lookup(ip);

    req._geoip = {};
    req._geoip.ip = ip;
    req._geoip.location = loc;

    next();
  };

}(require('geoip-lite')))

module.exports = geoip;