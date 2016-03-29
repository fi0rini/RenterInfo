// external deps
const url = require('url');
const qs = require('querystring');
const Router = require('express').Router();

  // local deps
const Trulia = require('../lib/Trulia');

// Router handler for google api requests
module.exports = function rout(key) {
  const trulia = new Trulia(key);

  // get the list of states that we can query
  Router.get('/states', function states(req, res) {
    const query = {};

    query.library = 'LocationInfo';
    query.function = 'getStates';

    trulia
      .proxy(query)
      .pipe(res);
  });

  Router.get('/stats', function stats(req, res) {
    const query = qs.parse(url.parse(req.url).query);

    query.library = 'TruliaStats';

    trulia
      .proxy(query)
      .pipe(res);
  });

  Router.get('/info', function info(req, res) {
    const query = qs.parse(url.parse(req.url).query);

    query.library = 'LocationInfo';

    trulia
      .proxy(query)
      .pipe(res);
  });

  return Router;
};
