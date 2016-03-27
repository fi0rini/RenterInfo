const React = require('react');
const { Jumbotron } = require('react-bootstrap');

class More extends React.Component {
  render() {
    return (
      <div className="welcome well">
        <Jumbotron>
          <h1 style={{textAlign: 'center'}}> More </h1>
        </Jumbotron>
      </div>
    );
  }
}

module.exports = More;