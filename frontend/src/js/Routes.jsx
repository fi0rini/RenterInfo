const React = require('react');
const { Router, Route, IndexRoute, browserHistory } = require('react-router');

const App = require('./components/App');
const Welcome = require('./components/Welcome');
const StateList = require('./components/StateList');
const DataPanel = require('./components/DataPanel');
const More = require('./components/More');
const Signup = require('./components/Signup');
const Login = require('./components/Login');

module.exports =
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
      <Route path="/more" component={More}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
      <Route path="/states" component={StateList}/>
      <Route path="/state/:statecode" component={DataPanel}/>
    </Route>
  </Router>;
