const React = require('react');
const { Jumbotron, Button } = require('react-bootstrap');
const { LinkContainer } = require('react-router-bootstrap');

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome well">
        <Jumbotron>
          <h1>RenterInfo <i className="fa fa-bar-chart fa-3x pull-right"></i> </h1>
          <p>
            A place to find property data about your community
          </p>
          <p>
            <LinkContainer to={{ pathname: 'more' }}>
              <Button className="btn-more" bsStyle="info">Learn more</Button>
            </LinkContainer>
            <LinkContainer to={{ pathname: 'signup' }}>
              <Button className="btn-signup" bsStyle="primary">Sign Up</Button>
            </LinkContainer>
            <LinkContainer to={{ pathname: 'states' }}>
              <Button className="btn-signup" bsStyle="warning">States</Button>
            </LinkContainer>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

module.exports = Welcome;
