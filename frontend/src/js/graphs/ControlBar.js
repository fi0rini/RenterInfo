const d3 = require('d3');

class ControlBar {
  constructor(node) {
    node.select('div')
      .append('div')
      .attr('class', 'controlbar');
  }
}

module.exports = ControlBar;
