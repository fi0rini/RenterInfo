const React = require('react');
const { PropTypes } = React;

class DateRangeSlider extends React.Component {
  static propTypes = {
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const bar =
      <div className="slider-bar"></div>;

    return bar;
  }
}

module.exports = DateRangeSlider;
