import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="/assets/logo.jpg" className="App-logo" alt="logo" />
          <h2>{this.props.title}</h2>
        </div>
        <p className="App-intro">
          Let's code and, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
};

export default connect(state => ({ title: state.app }))(App);
