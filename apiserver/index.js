// local deps
const KEY = require('../env').trulia.key

// routers and middleware
  , express = require('express')
  , apiserver = express()
  , cors = require('cors')
  , trulia = require('./routers/trulia');

// allow CORS requests
apiserver.use(cors());
apiserver.use(trulia(KEY));
apiserver.listen(5000, () => console.log('apiserver listening on ::5000'));
