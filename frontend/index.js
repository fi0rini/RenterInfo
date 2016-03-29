// start the express server
const express = require('express');
const session = require('express-session');

const geoip = require('./middleware/geoip');
const port = 3000;
const opts = { redirect: true };

const frontend = express();

// geoip middleware to place location into user's resp header
frontend.use(geoip);
frontend.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

frontend.use((req, res, next) => {
  next();
});

frontend.use('/', express.static('build', opts));
frontend.all('*', (req, res) => res.sendFile(__dirname + '/build/index.html'));

frontend.listen(port, () => {
  console.log('INFO: ' + 'express server started', new Date());
  console.log('INFO: ' + 'Server is at http://localhost:%d', port);
});

