const React = require('react');
const { Grid, Panel, OverlayTrigger, Popover, ButtonToolbar, ButtonGroup, Button } = require('react-bootstrap');
const Fetch = require('./fetch');

const { PropTypes } = React;
const { StateGraph } = require('../graphs');

class DataPanel extends Fetch {
  static propTypes = {
    statecode: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.__opts.url =
      `http://localhost:5000/stats?function=getStateStats&state=${this.props.params.statecode}&start-date=2015-12-01&end-date=2016-01-01`;
  }

  _renderResponse(xmlResponse) {
    const stateName = xmlResponse.getElementsByTagName('stateName')[0].innerHTML;
    const stateURL = xmlResponse.getElementsByTagName('stateURL')[0].innerHTML;
    const heatMapURL = xmlResponse.getElementsByTagName('heatMapURL')[0].innerHTML;

    const { statecode } = this.props.params;

    const popOver =
      <Popover id="info-popover" positionTop={100} title="More Info">
        <a href={stateURL}>{`${stateName} Real Estate`}</a>
        <br />
        <a href={heatMapURL}>Real Estate Heat Map</a>
      </Popover>;

    const header =
      <div className="header-container">
        <h1 className="state-title">
          {stateName} <small>({statecode.toUpperCase()})</small>
        </h1>
        <div className="toolbar">
          <ButtonToolbar>
            <OverlayTrigger container={this} trigger="click" placement="bottom" overlay={popOver}>
              <Button className="info-btn" bsStyle="default" bsSize="xsmall">
                <i className="fa fa-info"></i>
              </Button>
            </OverlayTrigger>

            <ButtonGroup>
              <Button bsSize="xsmall">
                Cities
              </Button>
              <Button bsSize="xsmall"> Counties </Button>
              <Button bsSize="xsmall"> Zip Codes </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>;

    const footer =
      <div className="trulia-logo">
        <img src="/images/trulia.jpg" />
      </div>;

    this.__response =
      <Panel className="datapanel" header={header} footer={footer}>
        <Grid >
          { new StateGraph(xmlResponse) }
        </Grid>
      </Panel>;

    return this.__response;
  }
}

module.exports = DataPanel;
