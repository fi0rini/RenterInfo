const React = require('react');
const StateMap = require('../stores/StateMap');
const { Grid, Row, Col, Label } = require('react-bootstrap');
const { Link } = require('react-router');

class StateList extends React.Component {
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

  setTheState() {
    const states = StateMap.getAllKeys();

    this.setState({
      states: states.map((s) => ({ name: StateMap.get(s).name, stateCode: StateMap.get(s).stateCode }))
    });
  }

  setTheError(e) {
    this.setState({ error: e });
  }

  render() {
    return (
      this.state.states ?
      <Grid>
        <Row>
        {this.state.states.map((state, key) =>
          <Col key={1} xs={12} sm={6} md={4} lg={3} key={key}>
            <Link to={`/state/${state.stateCode}`} className="state" bsSize="large" block>
              <div className="name">
                {state.name}
              </div>
              <Label bsStyle="primary" className="code">
                {state.stateCode}
              </Label>
            </Link>
          </Col>
          )}
        </Row>
      </Grid> : <div> Loading... </div>
    );
  }
}

module.exports = StateList;
