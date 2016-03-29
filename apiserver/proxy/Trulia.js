const url = require('url');
const request = require('request');
const assign = require('object-assign-deep');


const Trulia = function Trulia(key) {
  if (!key) throw new Error('missing API Key for Trulia.');

  this.__url = {
    protocol: 'http',
    host: 'api.trulia.com',
    pathname: 'webservices.php',
    query: {
      apikey: key
    }
  };
};

Trulia.prototype.proxy = function get(opts) {
  var _opts = opts || Object.create(null);
  var urlObj = assign(this.__url, { query: _opts });

  return request(url.format(urlObj));
};


module.exports = Trulia;
