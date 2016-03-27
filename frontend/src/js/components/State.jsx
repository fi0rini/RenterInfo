const React = require('react')
  , { Grid, Row, Col, ButtonToolbar, ButtonGroup, Button, DropdownButton } = require('react-bootstrap')
  , StateData = require('./StateData');

// LocationInfo Library
// getCitiesInState
// getCountiesInState
// getNeighborhoodsInCity
// getStates
// getZipCodesInState

class State extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.showModal = false;

    this.__code = this.props.params.code;
  }

  render() {
    const header = <h2> State {this.__code.toUpperCase()} </h2>;
    const toolbar =
      <ButtonToolbar>
        <ButtonGroup>
          <Button>
            Cities
          </Button>
          <Button>
            Counties
          </Button>
          <Button>
            Zip Codes
          </Button>
        </ButtonGroup>
      </ButtonToolbar>

    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            {header}
            {toolbar}
          </Col>
        </Row>
        <StateData code={this.__code} />
      </Grid>
    );
  }
}

module.exports = State;