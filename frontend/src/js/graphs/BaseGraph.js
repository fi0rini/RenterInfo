const d3 = require('d3');

class BaseGraph {
  constructor(n) {
    this.type = 'graph';
    this._node = n;
    this._scale = {};
    this._axis = {};
    this._dim = {};
    this._pad = {};
    this._parent = {};
    this._parent.dim = {};
  }

  init(n) {
    this._node = n;
    this._dim.height = parseInt(this._node.style('height'));
    this._dim.width = parseInt(this._node.style('width'));
  }
}

module.exports = BaseGraph;

//
// TrafficGraph.prototype.onresize = function onresize() {
//   proxy(this.__opts)
//     .then((xml) => {
//       this.setState({
//         loading: false,
//         error: false,
//         stateURL: xml.getElementsByTagName('stateURL')[0].innerHTML,
//         heatMapURL: xml.getElementsByTagName('heatMapURL')[0].innerHTML
//       });
//       // query the condition TrafficGraph.exists() searchs for 'svg.traffic-graph'
//       // in the DOM before it can render the visualization
//       // for 200 ms and then render the graph once it exists
//       // this is because we need React to render the DOM before we can have access to it
//       timer(50, 200, () => TrafficGraph.exists())
//         .then(() => {
//           /* TODO: new TrafficStat(height, width) ???? */
//           this._stateGraph = new TrafficGraph();
//           this._stateGraph.init(xml.documentElement.getElementsByTagName('trafficStat'));
//         });
//     }, (er) => this.setError(er));
// };
//
// TrafficGraph.exists = function exists() {
//   return d3.select('svg.traffic-graph');
// };

// module.exports = TrafficGraph;
