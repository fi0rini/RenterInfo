const React = require('react');

class Location extends React.Component {
  render() {
    return (
      <div>
        <i className="fa fa-globe"></i> {this.props.children}
      </div>
    );
  }
}

module.exports = Location;