const Immutable = require('immutable');
const EventEmitter = require('events').EventEmitter;
const { proxy } = require('../utils');
const { proxy: { api } } = require('../config');

class StateMap extends EventEmitter {
  constructor() {
    super();
    this._cb = {};
    this._states = Immutable.OrderedMap();
    this._proxy = proxy({
      url: `${api}/stateeree`,
      success: (doc) => {
        [].map.call(doc.getElementsByTagName('state'), (xml) => {
          const state = {
            type: 'Point',
            name: xml.getElementsByTagName('name')[0].innerHTML,
            stateCode: xml.getElementsByTagName('stateCode')[0].innerHTML,
            coordinates: [
              xml.getElementsByTagName('longitude')[0].innerHTML,
              xml.getElementsByTagName('latitude')[0].innerHTML
            ]
          };

          this.set(state.stateCode, state);
        });
        this.initialized = true;
        this.emit('init', this);
      },
      error: (er) => {
        this._initialized = true;
        this.emit('error', er);
      }
    });
  }

  set(a, b) {
    this._states = this._states.set(a, b);
  }

  get(a) {
    return this._states.get(a);
  }

  getAllKeys() {
    return Array.from(this._states.keys());
  }

}

StateMap.prototype.on = StateMap.prototype.addListener;

module.exports = new StateMap();
