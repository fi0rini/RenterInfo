const d3 = require('d3');
const ControlBar = require('./ControlBar');

class Dashboard {
  constructor(dash) {
    if (!dash) throw new Error('missing node in constructor');

    this._dashboard = dash;

    this._controlbar = dash.selectAll('#dashboard')
      .data([0])
      .enter()
      .append('div')
      .attr('class', 'controlbar')
      .style('width', '25%')
      .style('float', 'left')
      .style('height', '100%');

    this._controlbar.selectAll('ul')
      .data([0])
      .enter()
      .append('ul')
      .attr('class', 'widget-toolbar')
      .style('list-style', 'none')
      .style('margin', '0')
      .style('padding', '0')
      .selectAll('li')
      .data([{
        name: 'Control Item 1'
      }, {
        name: 'Control Item 2'
      }, {
        name: 'Control Item 3'
      }])
      .enter()
      .append('li')
      .attr('class', 'control-item')
      .style('width', '100%')
      .html((d) => d.name);

    this._dashboard.selectAll('.widgets')
      .data([0])
      .enter()
      .append('div')
      .html('some widget')
      .style('float', 'left');

    // this._controlbar = new ControlBar(this._controlbar);

    this._dim = {};
    this._dim.height = parseInt(this._dashboard.style('height'));
    this._dim.width = parseInt(this._dashboard.style('width'));

    this._states = [];

    window.onresize = (e) => this.resize(e);
  }

  resize() {
    this._dim.height = parseInt(this._dash.style('height'));
    this._dim.width = parseInt(this._dash.style('width'));

    this._dash.selectAll(this._graphs.map((g) => g._dash))
      .style('width', this._dim.width / this._graphs.length);
  }

  addState(statecode) {

  }

  addGraph(g) {
    return;
    if (!g && g.type !== 'graph') throw new Error('bad graph in constructor');

    const width = this._dim.width / this._graphs.length;
    const newNode = this._dash
      .append(g._dash)
      .style('width', width);

    this._graphs.push(g);
    this.resize();

    g.init(newNode);
  }

  removeGraph() {

  }
}

module.exports = Dashboard;
