const React = require('react');
const { ButtonToolbar, ButtonGroup, Button } = require('react-bootstrap');
const Fetch = require('./fetch');

const { PropTypes } = React;

class DataPanel extends Fetch {
  static propTypes = {
    statecode: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.__opts.url =
      `http://localhost:5000/stats?function=getStateStats&state=${this.props.statecode}&start-date=2015-12-01&end-date=2016-01-01`;
  }

  _renderResponse(xmlResponse) {
    console.log(xmlResponse);
    const stateName = xmlResponse.getElementsByTagName('stateName')[0].innerHTML;
    const stateUrl = xmlResponse.getElementsByTagName('stateURL')[0].innerHTML;
    const heatMapUrl = xmlResponse.getElementsByTagName('heatMapURL')[0].innerHTML;

    const { statecode } = this.props;
    const header =
        <h1>
          {stateName} <small> {statecode.toUpperCase()} </small>
        </h1>;

    const toolbar =
        <ButtonToolbar>
          <ButtonGroup>
            <Button bsSize="xsmall"> Cities </Button>
            <Button bsSize="xsmall"> Counties </Button>
            <Button bsSize="xsmall"> Zip Codes </Button>
          </ButtonGroup>
        </ButtonToolbar>;

    this.__response =
      <div className="datapanel">
        {header}
        {toolbar}
        {stateUrl}
        {heatMapUrl}
      </div>;

    return this.__response;
  }
}

module.exports = DataPanel;
