const React = require('react');
const { Grid, Panel, OverlayTrigger, Popover, ButtonToolbar, ButtonGroup, Button } = require('react-bootstrap');
const { proxy, timer } = require('../utils');
const { proxy: { api } } = require('../config');
const { PropTypes } = React;

const { TrafficGraph } = require('../graphs');

class DataPanel extends React.Component {
  static propTypes = {
    params: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.stateGraph = null;
    this.state = {};
    this.__startDate = '2015-01-01';
    this.__endDate = '2016-01-01';
    this.__opts = {};
    this.__opts.url = `${api}/state/${this.props.params.statecode}/${this.__startDate}/${this.__endDate}`;
    this.__promise = new Promise((r, _r) => { this.__opts.success = r; this.__opts.error = _r; });
  }

  componentDidMount() {
    proxy(this.__opts)
      .then((xml) => {
        this.setComponentProperties(xml);
        // query the condition TrafficGraph.exists() searchs for 'svg.traffic-graph'
        // in the DOM before it can render the visualization
        // for 200 ms and then render the graph once it exists
        // this is because we need React to render the DOM before we can have access to it
        timer(50, 200, () => TrafficGraph.exists())
          .then(() => {
            /* TODO: new TrafficStat(height, width) ???? */
            this.stateGraph = new TrafficGraph();
            this.stateGraph.init(xml.documentElement.getElementsByTagName('trafficStat'));
          });
      });
  }

  setComponentProperties(xml) {
    this.setState({
      stateName: xml.getElementsByTagName('stateName')[0].innerHTML,
      stateURL: xml.getElementsByTagName('stateURL')[0].innerHTML,
      heatMapURL: xml.getElementsByTagName('heatMapURL')[0].innerHTML
    });
  }

  render() {
    const { stateName, stateURL, heatMapURL } = this.state;
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

    const panel =
      <Panel className="datapanel" header={header} footer={footer}>
        <Grid >
          <svg height="500" width="100%" className="traffic-graph">
          </svg>
          <div className="slider">
            {`${this.__startDate} - ${this.__endDate}`}
          </div>
        </Grid>
      </Panel>;

    return panel;
  }

}

module.exports = DataPanel;
