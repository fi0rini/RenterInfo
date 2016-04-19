const d3 = require('d3');
const BaseGraph = require('./BaseGraph');
const { proxy: { api } } = require('../config');

class TrafficGraph extends BaseGraph {
  static propTypes = {};

  constructor(n, statecode) {
    super(n);
    this._statecode = statecode;
    this._pad.x = 80;
    this._pad.y = 80;
    this._range = [
      '2014-12-20', '2015-01-01'
    ];
  }

  init() {
    super.init();

    this._scale.x = d3.time.scale()
      .domain(this._range)
      .range([this._pad.x, this._dim.width - this._pad.x]);

    this._scale.y = d3.scale.linear()
        .domain([0, d3.max(this._data, (d) => d.pnt)])
        .range([this._dim.height - this._pad.y, this._pad.y]);

    // d3.xml(`${api}/state/${this._statecode}/${this._range[0]}/${this._range[1]}`, (err, xml) => {
    //   if (err) throw new Error(err);
    //
    //   this._node
    //     .selectAll('circles')
    //     .data(xml.getElementsByTagName('trafficStat'))
    //     .enter()
    //     .style('width', (d) => console.log(d))
    //
    // });
  }
}

    // this._axis.x = d3.svg.axis()
    //   .scale(this._scale.x)
    //   .orient('bottom');
    //
    // this._axis.y = d3.svg.axis()
    //   .scale(this._scale.y)
    //   .orient('left')
    //   .tickFormat((d) => d + '%');
    //
    // this._svg
    //   .selectAll('circle')
    //   .data(this._data)
    //   .enter()
    //   .append('circle')
    //   .attr('cy', (d) => this._scale.y(d.pnt))
    //   .attr('cx', (d) => this._scale.x(d.date))
    //   .attr('r', 2);
    //
    // this._svg
    //   .append('g')
    //   .call(this._axis.x)
    //   .attr('transform', 'translate(0,' + (this._dim.height - this._pad.y) + ')')
    //   .attr('class', 'axis')
    //   .selectAll('text')
    //   .attr('transform', 'rotate(50, -10, 20)');
    //
    // this._svg
    //   .append('g')
    //   .call(this._axis.y)
    //   .attr('class', 'axis')
    //   .attr('transform', 'translate(' + this._pad.x + ',0)');

module.exports = TrafficGraph;
