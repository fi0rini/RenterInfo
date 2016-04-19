const React = require('react');
const StateSelector = require('./StateSelector');
const Dashboard = require('./Dashboard');
const { Grid, Panel } = require('react-bootstrap');

class StatePanel extends React.Component {
  static propTypes = {
    statename: React.PropTypes.string,
    statecode: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { statecode, statename } = this.props;

    const header =
      <div className="header-container">
        <h1 className="state-title">
          {statename} <StateSelector title={statecode} />
        </h1>
        <div className="toolbar">
        </div>
      </div>;

    const footer =
      <div className="trulia-logo">
        <img src="/images/trulia.jpg" />
      </div>;

    return (
      <Panel className="datapanel" header={header} footer={footer}>
        <Grid>
          <Dashboard />
        </Grid>
      </Panel>
    );

  }

}

module.exports = StatePanel;
