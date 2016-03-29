const React = require('react');
const { Grid, Row, Col, Jumbotron, Navbar, Nav } = require('react-bootstrap');
const { Link } = require('react-router');

class Welcome extends React.Component {
  render() {
    return (
      <Grid className="welcome well">
        <Jumbotron>
          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <h1>RenterInfo <i className="fa fa-bar-chart"></i></h1>
              <p>
                A place to find property data about your community
              </p>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <i className="fa fa-bar-chart fa-5x"></i>
            </Col>
          </Row>
          <Row className="btn-row">
            <Navbar justified>
              <Nav bsStyle="pills">
                <Navbar.Text eventKey={1}>
                  <Link to="/more" className="btn-more" bsStyle="danger">Learn more</Link>
                </Navbar.Text>
                <Navbar.Text eventKey={2}>
                  <Link to="/signup" className="btn-signup" bsStyle="success">Sign Up</Link>
                </Navbar.Text>
                <Navbar.Text eventKey={3}>
                  <Link to="/states" className="btn-states" bsStyle="primary">States</Link>
                </Navbar.Text>
                <Navbar.Text eventKey={4}>
                  <Link to="/login" className="btn-login" bsStyle="warning">Log In</Link>
                </Navbar.Text>
              </Nav>
            </Navbar>
          </Row>
        </Jumbotron>
      </Grid>
    );
  }
}

module.exports = Welcome;
