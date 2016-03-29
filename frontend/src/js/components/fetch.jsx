const React = require('react');
const proxy = require('../utils/proxy');

const { PropTypes } = React;

class Fetch extends React.Component {
  static propTypes = {
    url: PropTypes.string
  };

  constructor(props) {
    var _resolve;
    var _reject;

    super(props);

    this.__promise = new Promise((resolve, reject) => { _resolve = resolve; _reject = reject; });

    this.state = {};
    this.state.loading = true;
    this.state.error = false;

    this.__opts = {};
    this.__opts.url = this.props.url;
    this.__opts.success = this._switch(_resolve);
    this.__opts.error = this._switch(_reject, true);

    this.__data = null;
  }

  componentDidMount() {
    this._fetchData();
  }

  _switch(r, er) {
    return (a) => {
      this.setState({ error: er });
      this.__response = a;
      r(a);
    };
  }

  _fetchData() {
    if (this.__opts.url) proxy(this.__opts);
    else console.warn('no url provided for the request');

    this.__promise.then(this._renderResponse.bind(this), this._renderError.bind(this)).then(() => this.setState({ loading: false }));
  }

  /**
   * This needs to be extended
   */
  _renderResponse() {
    return null;
  }

  /**
   * This needs to be extended for error rendering
   */
  _renderError() {
    return null;
  }

  render() {
    const { state: { loading, error } } = this;

    return <div> {
      loading ?
        <div> loading... </div> : error ? <div> ERROR </div> : this.__response
    } </div>;
  }
}

module.exports = Fetch;
