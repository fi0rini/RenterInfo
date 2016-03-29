const React = require('react');
const Fetch = require('./fetch.jsx');

const { Grid, Row, Col, Label } = require('react-bootstrap');
const { Link } = require('react-router');
const { proxy: { api } } = require('../config');
// const d3 = require('d3');

class StateList extends Fetch {
  constructor(props) {
    super(props);
    this.__opts.url = `${api}/info`;
  }

  _renderResponse(xmlResponse) {
    const states = xmlResponse.getElementsByTagName('state');
    const map = [].map.call(states, (stateXML, i) => {
      const stateCode = stateXML.getElementsByTagName('stateCode')[0].innerHTML;
      const name = stateXML.getElementsByTagName('name')[0].innerHTML;

      return (
        <Col key={i} xs={12} sm={6} md={4} lg={3} className="state">
            <Link to={`/state/${stateCode}`} bsSize="large" block>
              <div className="name">
                {name}
              </div>
              <Label bsStyle="primary" className="code">
                {stateCode}
              </Label>
            </Link>
        </Col>
      );
    });

    this.__response =
      <Grid>
        <Row>
          { map }
        </Row>
      </Grid>;
  }
}

module.exports = StateList;
