# RenterInfo
Providing visualization of property data in your local marketplace

## Getting Started
After you have the repo
```
$ npm install
$ cd frontend
$ gulp

#open a new tab

$ node index.js

#open a new tab

$ cd ../apiserver
$ node index.js

```

After running these commands, point your browser to http://localhost:3001 to see
the web application. You will be connected to browserSync then begin development.

## Directory Structure
#### -frontend
> contains all webapp related code, i.e. Frontend Express Server to server the data, React modules & components *

#### -apiserver
> contains Trulia express proxy for requesting data from Truila API server. Info for Trulia is located @ http://developer.trulia.com/docs

#### -authserver
> contains express proxy for authenticating the user, you can live without this for now and it is not fully functional
