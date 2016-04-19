const assign = require('object-assign');
const Immutable = require('immutable');

const { proxy: { api } } = require('./config');

const get = (url) => {
  let res;
  let rej;
  let p = new Promise((a, b) => { res = a; rej = b; });

  let req = d3.xml(`${url}`, (err, xml) => {
    if (err) rej(err);
    else res(xml);
  });

  return { req, p };
};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function storageAvailable(type) {
  var storage;
  var x;

	try {
		storage = window[type];
		x = '__storage_test__';

		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
    console.warn('Your browser does not support localStorage, try upgrading');
		return false;
	}
}

function mapStates(xml) {
  return Array.from(xml.getElementsByTagName('state')).map((state) => ({
    name: state.childNodes[0].innerHTML,
    statecode: state.childNodes[1].innerHTML,
    longitude: state.childNodes[2].innerHTML,
    latitude: state.childNodes[3].innerHTML
  }));
}

// const DATA_CACHE = {}; // for storing data
const HAS_STORAGE = storageAvailable('localStorage');
const STATES = HAS_STORAGE ? localStorage.getItem('_states') : null;
const MONTH_MAP = Immutable.fromJS({
  0: '01', 1: '02', 2: '03', 3: '04', 4: '05', 5: '06',
  6: '07', 7: '08', 8: '09', 9: '10', 10: '11', 11: '12'
});

class StateSelector {
  constructor(id, array) {
    this.element = $(id);

    array.forEach((state) =>
      $('<option>')
        .attr('value', state.statecode)
        .html(state.name)
        .appendTo(this.element)
    );

    return this.element;
  }
}

class DateRange {
  constructor() {
    this.min = new Date(2010, 0, 1, 0, 0, 0, 0);
    this.max = new Date();

    this.max.setHours(0, 0, 0, 0);
  }

  toArray() {
    return [this.min, this.max];
  }

  format(s) {
    let date = new Date(this[s]);
    let year = date.getFullYear();
    let month = MONTH_MAP.get(date.getMonth() + '');
    let day = date.getDate() < 10 ? MONTH_MAP.get(date.getDate() - 1 + '') : date.getDate();

    return `${year}-${month}-${day}`;
  }
}

class RangeSlider {
  constructor(id, range) {
    let tmp = new Date();

    tmp.setMonth(tmp.getMonth() - 4);

    this.range = range;
    this.element = $(id);
    this.value = $('<div>')
      .addClass('class', 'range-val')
      .html(`Date Range: <b>${tmp.toDateString()} </b> - <b> ${range.max.toDateString()}</b>`)
      .appendTo(this.element);

    this.slider = $('<div>')
      .addClass('daterange-slider')
      .slider({
        range: true,
        min: range.min.getTime(),
        max: range.max.getTime(),
        step: 8.64e7,
        values: [
          tmp.getTime(),
          range.max.getTime()
        ],
        slide: this.slide.bind(this)
      })
      .appendTo(this.element);

      range.min.setTime(tmp.getTime());

    return this.slider;
  }

  slide(event, ui) {
    let [ min, max ] = ui.values;

    this.value
      .html(`Date Range: <b>${new Date(min).toDateString()} </b> - <b> ${new Date(max).toDateString()}</b>`);
  }
}

class Graph {
  constructor(id, data) {
    this.graph = d3.select(id);
    this.parent = d3.select(this.graph[0][0].parentNode);

    this.data = data instanceof Array ? data : [];

    this.x = {};
    this.x.pad = 80;
    this.x.size = parseInt(this.parent.style('width'));

    this.y = {};
    this.y.pad = 80;
    this.y.size = parseInt(this.parent.style('height'));

    this.graph.style('width', this.x.size);
    this.graph.style('height', this.y.size);
  }

  domain(s, min, max) {
    this[s].domain = [min, max];
  }

  range(s, min, max) {
    this[s].range = [min, max];
  }

  resize() {
    this.x.size = parseInt(this.parent.style('width'));
    this.y.size = parseInt(this.parent.style('height'));

    this.graph
      .transition()
      .duration(100)
      .ease('linear')
      .style('height', this.y.size)
      .style('width', this.x.size);

    this.x.scale
      .range([this.x.pad, this.x.size - this.x.pad]);

    this.graph
      .select('.x-axis')
      .transition()
      .duration(100)
      .ease('linear')
      .call(this.x.axis);

    this.y.scale
      .range([this.y.size - this.y.pad, this.y.pad]);

    this.graph.select('.y-axis')
      .transition()
      .duration(100)
      .ease('linear')
      .call(this.y.axis);
  }
}

class TrafficGraph extends Graph {
  static XML_DATA_MAP = (xml) =>
    Array.from(xml.getElementsByTagName('trafficStat'))
      .map((trafficStat) => ({
        id: guid(),
        statecode: xml.getElementsByTagName('stateCode')[0].innerHTML,
        date: trafficStat.childNodes[0].innerHTML,
        pctNatTraffic: trafficStat.childNodes[1].innerHTML
      }));

  constructor(id) {
    super(id);
    this.r = 2;
    this.format = d3.time.format('%Y-%m-%d');
    this.dateFn = (d) => this.format.parse(d.date);

    this.tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, -3])
      .html((d) => `<div>${new Date(d.date).toDateString()}</div><div style="text-align:center; font-weight: 500;">%${Math.floor(d.pctNatTraffic * 100) / 100}</div>`);

    this.graph.call(this.tip);
  }

  merge(newData) {
    newData.forEach((data) => {
      if (!this.data.find((obj) => obj.date === data.date))
        this.data.push(data);
    });
  }

  scale(range) {
    if (!range) return this;

    this.range = range;

    this.x.scale = d3.time.scale()
      .domain([this.range.min, this.range.max])
      .range([this.x.pad, this.x.size - this.x.pad]);

    this.y.scale = d3.scale.linear()
      .domain([0, 20])
      .range([this.y.size - this.y.pad, this.y.pad]);

    this.x.axis = d3.svg.axis()
      .scale(this.x.scale)
      .orient('bottom');

    this.y.axis = d3.svg.axis()
      .scale(this.y.scale)
      .orient('left')
      .tickFormat((d) => d + '%');

    return this;
  }

  updatePoints() {
    this.graph.selectAll('circle').transition()
      .duration(300)
      .ease('linear')
      .attr('cx', (d) => this.x.scale(this.dateFn(d)))
      .attr('cy', (d) => this.y.scale(d.pctNatTraffic));
  }

  drawPoints() {
    let radius = this.r;
    let circles = this.graph.selectAll('circle').data(this.data, this.dateFn);
    let tip = this.tip;

    circles.transition()
      .duration(300)
      .ease('linear')
      .attr('cx', (d) => this.x.scale(this.dateFn(d)))
      .attr('cy', (d) => this.y.scale(d.pctNatTraffic));

    circles.enter()
      .append('circle')
      .attr('r', radius)
      .attr('cx', (d) => this.x.scale(this.dateFn(d)))
      .attr('cy', (d) => this.y.scale(d.pctNatTraffic))
      .on('mouseover', function mouseover(d) {
        d3.select(this)
          .transition()
          .duration(100)
          .ease('sin-in-out')
          .attr('r', radius * 3);

        tip.show(d);
      })
      .on('mouseleave', function mouseleave(d) {
        d3.select(this)
          .transition()
          .duration(500)
          .ease('sin-in-out')
          .attr('r', radius);

        tip.hide(d);
      });

    circles.exit()
      .remove();

    this.points = this.graph.selectAll('circle');
  }

  rescaleY() {
    this.y.scale
      .domain([0, d3.max(this.data, (d) => d.pctNatTraffic)]);

    this.graph.select('.y-axis')
      .transition()
      .duration(300)
      .ease('linear')
      .call(this.y.axis);
  }

  rescaleX(range) {
    if (range && range.min instanceof Date && range.max instanceof Date)
      this.range = range;

    this.x.scale
      .domain([this.range.min, this.range.max]);

    this.graph
      .select('.x-axis')
      .transition()
      .duration(300)
      .ease('linear')
      .call(this.x.axis);

    this.graph
      .selectAll('.x-axis text')
      .attr('transform', function trans() {
        return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-45)';
      });
  }

  drawAxes() {
    this.graph
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + (this.y.size - this.y.pad) + ')')
      .call(this.x.axis);

    this.graph
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', 'translate(' + this.x.pad + ',0)')
      .call(this.y.axis);

    // select all the text elements for the xaxis
    this.graph
      .selectAll('.x-axis text')
      .attr('transform', function trans() {
        return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-45)';
      });

    return this;
  }

  exists(min, max) {

  }

  resize() {
    super.resize();
    this.points
      .transition()
      .duration(100)
      .ease('linear')
      .attr('cy', (d) => this.y.scale(d.pctNatTraffic))
      .attr('cx', (d) => this.x.scale(this.dateFn(d)));
  }
}

function main(states) {
  let graphs = [];
  let currentState = states[0];
  let range = new DateRange();
  let selector = new StateSelector('#state-selector', states);
  let slider = new RangeSlider('#date-range', range);
  let trafficGraph = new TrafficGraph('#traffic-graph', range);
  let { req, p } = get(`${api}/state/${currentState.statecode}/${range.format('min')}/${range.format('max')}`);

  graphs.push(trafficGraph);

  p
    .then(TrafficGraph.XML_DATA_MAP)
    .then(function _(traffic) {
      this.merge(traffic);
      this.scale(range);
      this.drawPoints();
      this.drawAxes();
    }.bind(trafficGraph));

  slider.on('slide', function slide(event, ui) {
    let [_min, _max] = ui.values;

    range.min.setTime(_min);
    range.max.setTime(_max);

    this.rescaleX(range);
    this.updatePoints();

    req.abort();

  }.bind(trafficGraph));

  slider.on('slidechange', function slidechange(event, ui) {
    let [_min, _max] = ui.values;
    let _get;

    range.min.setTime(_min);
    range.max.setTime(_max);

    this.rescaleX(range);
    this.updatePoints();

    this.exists(range.format('min'), range.format('max'));

    _get = get(`${api}/state/${currentState.statecode}/${range.format('min')}/${range.format('max')}`);

    _get.p
      .then(TrafficGraph.XML_DATA_MAP)
      .then(function _(traffic) {
        this.merge(traffic);
        this.drawPoints();
      }.bind(trafficGraph));

    req = _get.req;

  }.bind(trafficGraph));

  // selector.on('change', function selectChange(event) {
    // get(`${api}/state/${currentState.statecode}/${range.format('min')}/${range.format('max')}`)
    //   .then(TrafficGraph.XML_DATA_MAP)
    //   .then(function _(traffic) {
    //     this.merge(traffic);
    //     this.scale(range);
    //     this.draw();
    //   }.bind(trafficGraph));
  // });

  $(window).on('resize', () => graphs.forEach((g) => g.resize()));

}

if (!STATES) get(`${api}/state`).promise
    .then(mapStates)
    .then(main);
else
  main(JSON.parse(STATES));

