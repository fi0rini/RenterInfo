const React = require('react');
const { Link } = require('react-router');
const { Nav, Navbar, NavItem, NavDropdown, MenuItem } = require('react-bootstrap');

const { PropTypes } = React;
const Location = require('./Location');
const cookies = require('../utils/cookies');

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  constructor(props) {
    var location;

    super(props);

    try {
      location = JSON.parse(cookies.getItem('location'));
      this._location = `${location.region}, ${location.city}`;
    } catch (e) {
      console.warn(e.message);
      location = 'click to set location';
    }
  }

  render() {
    return (
      <div className="application">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">RenterInfo</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={3.1}>
                <Location>{this._location}</Location>
              </NavItem>
              <NavItem eventKey={2} href="/login">Log In</NavItem>
              <NavDropdown eventKey={3} title="Username" id="basic-nav-dropdown">
                <MenuItem divider />
                <MenuItem eventKey={3.2}>Action</MenuItem>
                <MenuItem eventKey={3.3}>Another action</MenuItem>
                <MenuItem eventKey={3.4}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.5}>Log Out</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        { this.props.children }
      </div>
    );
  }
}

module.exports = App;
