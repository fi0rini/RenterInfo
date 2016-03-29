// external deps
const url = require('url');
const qs = require('querystring');
const assign = require('object-assign');
const Router = require('express').Router();
  // local deps
const Trulia = require('../proxy/Trulia');

// TruliaStats Library
// getCityStats
// getCountyStats
// getNeighborhoodStats
// getStateStats
// getZipCodeStats
const STATS = {
  fn: function fn(str) { return assign(this.LIBRARY, { 'function': str }); },
  get LIBRARY() { return { library: 'TruliaStats' }; },
  get CITY() { return this.fn('getCityStats'); },
  get COUNTY() { return this.fn('getCountyStats'); },
  get NEIGHBORHOOD() { return this.fn('getNeighborhoodStats'); },
  get STATE() { return this.fn('getStateStats'); },
  get ZIPCODE() { return this.fn('getZipCodeStats'); }
};

// LocationInfo Library
// getCitiesInState
// getCountiesInState
// getNeighborhoodsInCity
// getStates
// getZipCodesInState
const INFO = {
  fn: function fn(str) { return assign(this.LIBRARY, { 'function': str }); },
  get LIBRARY() { return { library: 'LocationInfo' }; },
  get CITIES() { return this.fn('getCitiesInState'); },
  get COUNTIES() { return this.fn('getCountiesInState'); },
  get NEIGHBORHOODS() { return this.fn('getNeighborhoodsInCity'); },
  get STATES() { return this.fn('getStates'); },
  get ZIPCODES() { return this.fn('getZipCodesInState'); }
};

const STATE_CODE = 'state';
const CITY = 'city';
const COUNTY = 'county';
const NEIGHBORHOOD_ID = 'neighborhoodId';
const ZIPCODE = 'zipCode';
const START_DATE = 'startDate';
const END_DATE = 'endDate';

// Router handler for google api requests
module.exports = function router(key) {
  if (typeof key !== 'string') throw new Error('missing API Key, try again');

  const trulia = new Trulia(key);
  const parseQuery = (r) => qs.parse(url.parse(r.url).query);
  const appendParam = (p) => (r, _r, n, v) => { r._api = r._api || {}; r._api[p] = v; n(); };
  const proxy = (e) => (r, _r) => trulia.proxy(assign(parseQuery(r), r._api, e)).pipe(_r);

  Router.param(STATE_CODE, appendParam(STATE_CODE));
  Router.param(CITY, appendParam(CITY));
  Router.param(NEIGHBORHOOD_ID, appendParam(NEIGHBORHOOD_ID));
  Router.param(ZIPCODE, appendParam(ZIPCODE));
  Router.param(COUNTY, appendParam(COUNTY));
  Router.param(START_DATE, appendParam(START_DATE));
  Router.param(END_DATE, appendParam(END_DATE));

  // get the list of states that we can query
  Router.get('/state', proxy(INFO.STATES));
  Router.get(`/state/:${STATE_CODE}/cities`, proxy(INFO.CITIES));
  Router.get(`/state/:${STATE_CODE}/counties`, proxy(INFO.COUNTIES));
  Router.get(`/state/:${STATE_CODE}/zipcodes`, proxy(INFO.ZIPCODES));
  Router.get(`/state/:${STATE_CODE}/city/${CITY}`, proxy(INFO.NEIGHBORHOODS));
  Router.get(`/state/:${STATE_CODE}/:${START_DATE}/:${END_DATE}`, proxy(STATS.STATE));
  Router.get(`/state/:${STATE_CODE}/city/:${CITY}/stats/:${START_DATE}/:${END_DATE}`, proxy(STATS.CITY));
  Router.get(`/state/:${STATE_CODE}/counties/:${COUNTY}/stats/:${START_DATE}/:${END_DATE}`, proxy(STATS.COUNTY));
  Router.get(`/neighborhood/:${NEIGHBORHOOD_ID}/:${START_DATE}/:${END_DATE}`, proxy(STATS.NEIGHBORHOOD));
  Router.get(`/zipcode/:${ZIPCODE}/:${START_DATE}/:${END_DATE}`, proxy(STATS.ZIPCODE));


  return Router;
};
