/**
 * The idea of the service.js file is to abstract away the
 * details of many repetitive service calls that we will be using.
 * @author Nick Fiorini <nf071590@gmail.com>
 */
'use strict';
const url = require('url');
const ajax = require('./jquery').ajax;

const defaults = {
  query: {},
  type: 'GET',
  dataType: 'json',
  baseUrl: 'http://localhost:5000',
  success: (res) => console.warn('Success function not defined for ajax call:', res),
  error: (err) => console.error(err.message)
};

function proxy (options) {
  options.url = defaults.baseUrl + url.parse(options.url).path;
  options.data = options.data ? options.data : {};
  options.error = options.error ? options.error : defaults.error;
  options.success = options.success ? options.success : defaults.success;
  options.crossDomain = true;

  return ajax(options);
};

module.exports = proxy;