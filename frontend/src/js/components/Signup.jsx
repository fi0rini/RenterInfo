const React = require('react');
const { Panel } = require('react-bootstrap');

class Signup extends React.Component {
  render() {
    const title = <h1> Signup </h1>;

    return (
      <Panel className="welcome" header={title}>
        <div> signup </div>
      </Panel>
    );
  }
}

module.exports = Signup;
