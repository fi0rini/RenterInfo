// local deps

// routers and middleware
const express = require('express');
const cors = require('cors');
const trulia = require('./routers/trulia');
const KEY = require('../env').trulia.key;

const apiserver = express();

// allow CORS requests
apiserver.use(cors());
apiserver.use(trulia(KEY));
apiserver.listen(5000, () => console.log('apiserver listening on ::5000'));
