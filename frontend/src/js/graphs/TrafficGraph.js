const d3 = require('d3');

window.onresize = (e) => console.log(e);

function TrafficGraph() {
  this._svg = d3.select('svg.traffic-graph');
  this._svg.style('padding', 0);

  this._dim = {};
  this._dim.height = parseInt(this._svg.style('height')) || 500;
  this._dim.width = parseInt(this._svg.style('width')) || 700;

  this._pad = {};
  this._pad.x = 80;
  this._pad.y = 80;
}

TrafficGraph.prototype.init = function init(xml) {
  this._xml = xml;
  this._data = [].map.call(this._xml, (t) => ({
    date: new Date(t.childNodes[0].innerHTML),
    // percent national traffic
    pnt: t.childNodes[1].innerHTML
  }));

  this._scale = {};
  this._scale.x = d3.time.scale()
    .domain([this._data[0].date, this._data[this._data.length - 1].date])
    .range([this._pad.x, this._dim.width - this._pad.x]);

  this._scale.y = d3.scale.linear()
      .domain([d3.min(this._data, (d) => d.pnt) - 0.2, d3.max(this._data, (d) => d.pnt)])
      .range([this._dim.height - this._pad.y, this._pad.y]);

  this._axis = {};
  this._axis.x = d3.svg.axis()
    .scale(this._scale.x)
    .orient('bottom');

  this._axis.y = d3.svg.axis()
    .scale(this._scale.y)
    .orient('left');

  this._svg
    .selectAll('circle')
    .data(this._data)
    .enter()
    .append('circle')
    .attr('cy', (d) => this._scale.y(d.pnt))
    .attr('cx', (d) => this._scale.x(d.date))
    .attr('r', 2);

  this._svg
    .append('g')
    .call(this._axis.x)
    .attr('transform', 'translate(0,' + (this._dim.height - this._pad.y) + ')')
    .attr('class', 'axis')
    .selectAll('text')
    .attr('transform', 'rotate(50, -10, 20)');

  this._svg
    .append('g')
    .call(this._axis.y)
    .attr('class', 'axis')
    .attr('transform', 'translate(' + this._pad.x + ',0)');
};

TrafficGraph.prototype.setRange = function setRange() { console.log(); };

TrafficGraph.exists = function exists() {
  return d3.select('svg.traffic-graph');
};

module.exports = TrafficGraph;
