const React = require('react');
const { Grid, Row, Col } = require('react-bootstrap');
const DataPanel = require('./DataPanel');

const { PropTypes } = React;

class State extends React.Component {
  static propTypes = {
    params: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.state.showModal = false;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <DataPanel statecode={this.props.params.statecode} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

module.exports = State;
