const React = require('react');
const { Router, Route, IndexRoute, browserHistory } = require('react-router');

const App = require('./components/App')
    , Welcome = require('./components/Welcome')
    , StateList = require('./components/StateList')
    , State = require('./components/State')
    , More = require('./components/More')
    , Signup = require('./components/Signup')
    , Login = require('./components/Login');


const Routes =
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
      <Route path="/more" component={More}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
      <Route path="/states" component={StateList} />
      <Route path="/state/:statecode" component={State} />
    </Route>
  </Router>

module.exports = Routes;