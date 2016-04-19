const React = require('react');
const { SplitButton, MenuItem } = require('react-bootstrap');
const { browserHistory } = require('react-router');

const { PropTypes } = React;

const StateMap = require('../stores/StateMap');

class StateSelector extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (StateMap.getAllKeys().length) this.setTheState();
    else {
      StateMap.once('init', (r) => this.setTheState(r));
      StateMap.once('error', (e) => this.setTheError(e));
    }
  }

  goToState(e, code) {
    browserHistory.push(`/state/${code}`);
  }

  setTheState() {
    const states = StateMap
      .getAllKeys()
      .map((k, i) =>
        <MenuItem key={i + 1} eventKey={StateMap.get(k).stateCode}>
          {StateMap.get(k).stateCode}
        </MenuItem>
      );

    this.setState({ states: states });
  }

  setTheError(e) {
    this.setState({ error: e });
  }

  render() {
    const DefaultProps = {
      className: 'state-selector',
      bsStyle: 'primary',
      id: 'state selector',
      title: this.props.title,
      onSelect: this.goToState,
      key: 0
    };

    return !this.state.states ? <SplitButton {...DefaultProps}/> :
      <SplitButton {...DefaultProps}> {this.state.states}</SplitButton>;
  }
}

module.exports = StateSelector;
