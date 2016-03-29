const React = require('react');
const { Jumbotron } = require('react-bootstrap');

class Signup extends React.Component {
  render() {
    return (
      <div className="welcome well">
        <Jumbotron>
          <h1 style={{ textAlign: 'center' }}> Signup </h1>
        </Jumbotron>
      </div>
    );
  }
}

module.exports = Signup;
