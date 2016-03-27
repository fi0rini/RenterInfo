# RenterInfo
Providing visualization of property data in your local marketplace

# Before You Start
You need to get api keys. If you want to skip google+ auth for now you can go right to the Trulia data api key.

Go to https://console.developers.google.com/ and enable a Google + api *secret* and *key*

Go to http://developer.trulia.com/member/register and register for a Trulia data api key  

Once you have key(s)/secret(s), fill them in in the appropriate locations in the `env.js` so that your proxy modules will work.


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
