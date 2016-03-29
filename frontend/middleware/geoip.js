const geoip = require('geoip-lite');

module.exports = (req, res, next) => {
  // for production use
  // const ip = req.connection.remoteAddress;

  const ip = '128.143.0.0';
  const loc = JSON.stringify(geoip.lookup(ip));

  res.cookie('location', loc);

  next();
};
