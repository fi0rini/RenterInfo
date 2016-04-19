const React = require('react');
const ReactDOM = require('react-dom');
const { Dashboard, TrafficGraph } = require('../graphs');


class Dash extends React.Component {
  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);

    const dashboard = new Dashboard(dom);
    const graph = new TrafficGraph('div.graph', 'NY');

    dashboard.addGraph(graph);
  }

  render() {
    return <div className="console"> Dashboard-Area </div>;
  }
}

module.exports = Dash;
