const React = require('react');
const { PropTypes } = React;

class Location extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <i className="fa fa-globe"></i> {this.props.children}
      </div>
    );
  }
}

module.exports = Location;
