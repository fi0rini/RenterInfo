const Trulia = (function(url, request, assign) {

  function _Trulia (key) {
    if (!key) throw new Error('missing API Key for Trulia.')

    this.__url = {
      protocol: "http",
      host: "api.trulia.com",
      pathname: "webservices.php",
      query: {
        apikey: key
      }
    }
  }

  _Trulia.prototype.proxy = function get (opts) {
    const _url = (str) =>  url.resolve(this.__url.pathname, str);

    var opts = opts || Object.create(null);
    var urlObj = assign(this.__url, { query: opts });

    return request(url.format(urlObj));
  }

  return _Trulia;

}(require('url'), require('request'), require('object-assign-deep')));

module.exports = Trulia;