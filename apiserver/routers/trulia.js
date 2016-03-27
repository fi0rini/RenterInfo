// external deps
const url = require('url')
  , qs = require('querystring')
  , assign = require('object-assign-deep')
  , route = require('express').Router()

  // local deps
  , Trulia = require('../lib/Trulia');

// route handler for google api requests
module.exports = function (key) {
  const trulia = new Trulia(key);

  // get the list of states that we can query
  route.get('/states', function (req, res, next) {
    const query = {};
    query.library = 'LocationInfo';
    query.function = 'getStates';

    trulia
      .proxy(query)
      .pipe(res);
  });

  route.get('/stats', function (req, res, next) {
    const query = qs.parse(url.parse(req.url).query);

    query.library = 'TruliaStats';

    trulia
      .proxy(query)
      .pipe(res);
  });

  route.get('/info', function (req, res, next) {
    const query = qs.parse(url.parse(req.url).query);
    query.library = 'LocationInfo';

    trulia
      .proxy(query)
      .pipe(res);
  });

  return route;
};