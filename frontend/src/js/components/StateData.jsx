const React = require('react')
  , Fetch = require('./fetch');

class StateData extends Fetch {
  constructor(props) {
    super(props);
    this.__code = this.props.code;
    this.__opts.url = `http://localhost:5000/stats?function=getStateStats&state=${this.__code}&start-date=2015-12-01&end-date=2016-01-01`;
  }
  
  _renderResponse(xmlResponse) {
    console.log(xmlResponse);
    this.__response = <div> Hello world! </div>
    return this.__response;
  }
}

module.exports = StateData;