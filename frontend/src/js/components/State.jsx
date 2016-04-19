const React = require('react');
const { StateMap } = require('../stores');
const StatePanel = require('./StatePanel');

class State extends React.Component {
  static propTypes = {
    params: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.state.init = false;
    this.state.error = false;
  }

  componentDidMount() {
    if (!StateMap.getAllKeys().length) {
      StateMap.once('init', () => this.setState({ init: true }));
      StateMap.once('error', () => this.setState({ error: true }));
    } else
      this.setState({ init: true });
  }

  setTheName() {
    this.setState({
      states: StateMap.getAllKeys()
    });
  }

  setTheError() {
    this.setState({
      error: true
    });
  }

  render() {
    // if (!this.state.init) return <div> Loading States... </div>;

    const { statecode } = this.props.params;
    const { name } = StateMap.get(statecode);

    return (
      <div>
        <StatePanel statename={name} statecode={statecode} />
      </div>
    );
  }
}

module.exports = State;
